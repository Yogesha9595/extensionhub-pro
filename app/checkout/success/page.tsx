"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

/* ========================================================================== */
/* CHECKOUT SUCCESS PAGE                                                      */
/* ========================================================================== */

const ACCESSSCAN_EXTENSION_ID =
  "kboajclcikaacjahplodipielkpoogef";

type ChromeRuntimeApi = {
  sendMessage?: (
    extensionId: string,
    message: {
      type: "CLOSE_CHECKOUT_TAB";
    },
  ) => Promise<unknown>;
};

type ChromeApi = {
  runtime?: ChromeRuntimeApi;
};

export default function CheckoutSuccessPage() {
  /* ======================================================================== */
  /* STATE                                                                    */
  /* ======================================================================== */

  const [countdown, setCountdown] =
    useState(5);

  /* ======================================================================== */
  /* REFS                                                                     */
  /* ======================================================================== */

  /*
   * Prevents overlapping close requests caused by a rapid double click or
   * by the automatic countdown firing at the same time as a manual click.
   */
  const closeInProgressRef =
    useRef(false);

  /*
   * Stores the browser interval ID so the close function can clear the
   * countdown regardless of whether it was triggered automatically or
   * manually.
   */
  const intervalRef =
    useRef<number | null>(null);

  /*
   * Tracks whether the component is still mounted before updating state.
   */
  const isMountedRef =
    useRef(true);

  /* ======================================================================== */
  /* CLOSE CHECKOUT TAB                                                       */
  /* ======================================================================== */

  const closeCheckoutWindow =
    useCallback(() => {
      if (
        closeInProgressRef.current
      ) {
        return;
      }

      closeInProgressRef.current =
        true;

      console.info(
        "[ExtensionHub Checkout] Attempting to close checkout tab.",
      );

      /*
       * Stop the automatic countdown immediately.
       */
      if (
        intervalRef.current !== null
      ) {
        window.clearInterval(
          intervalRef.current,
        );

        intervalRef.current = null;
      }

      /*
       * The checkout was opened by the AccessScan extension with
       * chrome.tabs.create(). Therefore window.close() is normally blocked
       * by Chrome. Ask the extension background service to close the
       * current sender tab instead.
       */
      try {
        const chromeApi =
          (
            globalThis as typeof globalThis & {
              chrome?: ChromeApi;
            }
          ).chrome;

        const sendMessage =
          chromeApi
            ?.runtime
            ?.sendMessage;

        if (
          typeof sendMessage ===
          "function"
        ) {
          void sendMessage(
            ACCESSSCAN_EXTENSION_ID,
            {
              type:
                "CLOSE_CHECKOUT_TAB",
            },
          )
            .then(() => {
              console.info(
                "[ExtensionHub Checkout] Checkout tab close request sent to AccessScan.",
              );
            })
            .catch((error) => {
              console.warn(
                "[ExtensionHub Checkout] AccessScan close request was not delivered.",
                error,
              );

              /*
               * Chrome may still permit window.close() in some contexts.
               * Keep it as a best-effort fallback.
               */
              closeInProgressRef.current =
                false;

              window.close();
            });

          return;
        }
      } catch (error) {
        console.warn(
          "[ExtensionHub Checkout] AccessScan close request failed.",
          error,
        );
      }

      /*
       * Fallback when the Chrome extension API is unavailable.
       */
      closeInProgressRef.current =
        false;

      window.close();
    }, []);

  /* ======================================================================== */
  /* COUNTDOWN + AUTOMATIC CLOSE                                              */
  /* ======================================================================== */

  useEffect(() => {
    isMountedRef.current =
      true;

    /*
     * Start the five-second countdown.
     */
    intervalRef.current =
      window.setInterval(() => {
        if (
          !isMountedRef.current
        ) {
          return;
        }

        setCountdown(
          (current) => {
            if (
              current <= 1
            ) {
              /*
               * Execute the close request outside the state updater.
               * This keeps side effects out of React's state calculation.
               */
              window.setTimeout(() => {
                if (
                  isMountedRef.current
                ) {
                  console.info(
                    "[ExtensionHub Checkout] Success countdown completed.",
                  );

                  closeCheckoutWindow();
                }
              }, 0);

              return 0;
            }

            return current - 1;
          },
        );
      }, 1000);

    return () => {
      isMountedRef.current =
        false;

      if (
        intervalRef.current !== null
      ) {
        window.clearInterval(
          intervalRef.current,
        );

        intervalRef.current = null;
      }
    };
  }, [
    closeCheckoutWindow,
  ]);

  /* ======================================================================== */
  /* UI                                                                       */
  /* ======================================================================== */

  return (
    <main
      style={{
        minHeight:
          "100vh",

        display:
          "flex",

        alignItems:
          "center",

        justifyContent:
          "center",

        background:
          "#0f172a",

        color:
          "#ffffff",

        fontFamily:
          "Arial, sans-serif",

        padding:
          "24px",
      }}
    >
      <div
        style={{
          width:
            "100%",

          maxWidth:
            "600px",

          textAlign:
            "center",

          padding:
            "48px",

          borderRadius:
            "16px",

          background:
            "#172033",

          border:
            "1px solid #334155",

          boxShadow:
            "0 20px 50px rgba(0, 0, 0, 0.35)",
        }}
      >
        {/* ================================================================ */}
        {/* SUCCESS ICON                                                     */}
        {/* ================================================================ */}

        <div
          style={{
            width:
              "90px",

            height:
              "90px",

            margin:
              "0 auto 24px",

            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            borderRadius:
              "50%",

            border:
              "3px solid #22c55e",

            color:
              "#22c55e",

            fontSize:
              "52px",

            fontWeight:
              "bold",
          }}
        >
          ✓
        </div>

        {/* ================================================================ */}
        {/* TITLE                                                             */}
        {/* ================================================================ */}

        <h1
          style={{
            margin:
              "0 0 16px",

            fontSize:
              "32px",

            lineHeight:
              "1.2",
          }}
        >
          Payment successful!
        </h1>

        {/* ================================================================ */}
        {/* DESCRIPTION                                                       */}
        {/* ================================================================ */}

        <p
          style={{
            margin:
              "0",

            fontSize:
              "18px",

            lineHeight:
              "1.6",

            color:
              "#cbd5e1",
          }}
        >
          Your AccessScan Pro subscription
          has been activated successfully.
        </p>

        {/* ================================================================ */}
        {/* COUNTDOWN                                                         */}
        {/* ================================================================ */}

        <div
          style={{
            marginTop:
              "32px",

            padding:
              "18px",

            borderRadius:
              "10px",

            background:
              "#0f172a",

            border:
              "1px solid #334155",

            color:
              "#94a3b8",

            fontSize:
              "16px",
          }}
        >
          This window will close automatically in{" "}

          <strong
            style={{
              color:
                "#ffffff",

              fontSize:
                "18px",
            }}
          >
            {countdown}
          </strong>

          {" "}second
          {countdown !== 1
            ? "s"
            : ""}.
        </div>

        {/* ================================================================ */}
        {/* FALLBACK INFORMATION                                              */}
        {/* ================================================================ */}

        <p
          style={{
            marginTop:
              "20px",

            marginBottom:
              "0",

            fontSize:
              "13px",

            lineHeight:
              "1.6",

            color:
              "#64748b",
          }}
        >
          You can now return to the AccessScan extension.
        </p>

        {/* ================================================================ */}
        {/* MANUAL CLOSE BUTTON                                               */}
        {/* ================================================================ */}

        <button
          type="button"
          onClick={
            closeCheckoutWindow
          }
          style={{
            marginTop:
              "24px",

            padding:
              "10px 20px",

            border:
              "1px solid #475569",

            borderRadius:
              "8px",

            background:
              "transparent",

            color:
              "#cbd5e1",

            cursor:
              "pointer",

            fontSize:
              "14px",
          }}
        >
          Close Window
        </button>
      </div>
    </main>
  );
}
