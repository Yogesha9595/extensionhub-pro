"use client";

import { useEffect, useRef } from "react";

import {
  initializePaddle,
  type Paddle,
} from "@paddle/paddle-js";

/* ========================================================================== */
/* PADDLE CONFIGURATION                                                       */
/* ========================================================================== */

const PADDLE_CLIENT_TOKEN =
  process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;

const PADDLE_ENVIRONMENT =
  process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === "production"
    ? "production"
    : "sandbox";

/* ========================================================================== */
/* PADDLE CHECKOUT LAUNCHER                                                   */
/* ========================================================================== */

/**
 * This component:
 *
 * 1. Detects a Paddle transaction ID from ?_ptxn=
 * 2. Initializes Paddle.js
 * 3. Opens Paddle Checkout for that transaction
 *
 * Example:
 *
 * https://extensionhub.in?_ptxn=txn_123
 *
 * Transactions are created by the trusted AccessScan API.
 *
 * This component never:
 *
 * - creates transactions
 * - uses Paddle API keys
 * - grants Pro access
 * - verifies payments
 */

export function PaddleCheckoutLauncher() {
  const openedTransactionRef =
    useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function launchCheckout() {
      /* -------------------------------------------------------------------- */
      /* READ TRANSACTION ID                                                  */
      /* -------------------------------------------------------------------- */

      const searchParams =
        new URLSearchParams(
          window.location.search
        );

      const transactionId =
        searchParams.get("_ptxn");

      /*
       * Normal ExtensionHub visit.
       */
      if (!transactionId) {
        return;
      }

      console.log(
        "[ExtensionHub] Paddle transaction detected:",
        transactionId
      );

      /* -------------------------------------------------------------------- */
      /* PREVENT DUPLICATE OPENING                                            */
      /* -------------------------------------------------------------------- */

      if (
        openedTransactionRef.current ===
        transactionId
      ) {
        return;
      }

      /* -------------------------------------------------------------------- */
      /* VALIDATE CLIENT TOKEN                                                */
      /* -------------------------------------------------------------------- */

      if (!PADDLE_CLIENT_TOKEN) {
        console.error(
          "[ExtensionHub] NEXT_PUBLIC_PADDLE_CLIENT_TOKEN is missing."
        );

        return;
      }

      try {
        /* ------------------------------------------------------------------ */
        /* INITIALIZE PADDLE                                                  */
        /* ------------------------------------------------------------------ */

        const paddleInstance: Paddle | undefined =
          await initializePaddle({
            token:
              PADDLE_CLIENT_TOKEN,

            environment:
              PADDLE_ENVIRONMENT,
          });

        if (cancelled) {
          return;
        }

        if (!paddleInstance) {
          throw new Error(
            "Paddle initialization returned no instance."
          );
        }

        console.log(
          "[ExtensionHub] Paddle initialized successfully."
        );

        /* ------------------------------------------------------------------ */
        /* OPEN CHECKOUT                                                      */
        /* ------------------------------------------------------------------ */

        openedTransactionRef.current =
          transactionId;

        paddleInstance.Checkout.open({
          transactionId,
        });

        console.log(
          "[ExtensionHub] Paddle checkout opened:",
          transactionId
        );

      } catch (error) {
        console.error(
          "[ExtensionHub] Unable to launch Paddle checkout:",
          error
        );
      }
    }

    void launchCheckout();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}