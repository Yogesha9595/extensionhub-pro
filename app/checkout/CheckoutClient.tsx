"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  initializePaddle,
  type Paddle,
  type PaddleEventData,
} from "@paddle/paddle-js";

/* ========================================================================== */
/* TYPES                                                                      */
/* ========================================================================== */

type CheckoutStatus =
  | "loading"
  | "opened"
  | "completed"
  | "cancelled"
  | "error";

interface CheckoutClientProps {
  transactionId: string;
}

/* ========================================================================== */
/* COMPONENT                                                                  */
/* ========================================================================== */

export default function CheckoutClient({
  transactionId,
}: CheckoutClientProps) {
  const [
    status,
    setStatus,
  ] = useState<CheckoutStatus>(
    "loading",
  );

  const [
    error,
    setError,
  ] = useState<string | null>(
    null,
  );

  /*
   * Paddle instance.
   *
   * We keep this in a ref because the Paddle instance
   * must not trigger React re-renders.
   */
  const paddleRef =
    useRef<Paddle | null>(
      null,
    );

  /*
   * Prevent duplicate initialization/open calls.
   *
   * This is particularly important in React development
   * mode where effects may run more than once.
   */
  const initializedRef =
    useRef(false);

  /*
   * Prevent multiple completion redirects.
   */
  const completedRef =
    useRef(false);

  /*
   * Tracks whether this component is still mounted.
   *
   * Prevents state updates after unmount.
   */
  const mountedRef =
    useRef(true);

  /* ------------------------------------------------------------------------ */
  /* SAFE STATE HELPERS                                                       */
  /* ------------------------------------------------------------------------ */

  const setSafeStatus =
    useCallback(
      (
        nextStatus: CheckoutStatus,
      ) => {
        if (
          mountedRef.current
        ) {
          setStatus(
            nextStatus,
          );
        }
      },
      [],
    );

  const setSafeError =
    useCallback(
      (
        message: string | null,
      ) => {
        if (
          mountedRef.current
        ) {
          setError(
            message,
          );
        }
      },
      [],
    );

    /* ------------------------------------------------------------------------ */
  /* ACCESSSCAN EXTENSION NOTIFICATION                                       */
  /* ------------------------------------------------------------------------ */

  const notifyAccessScanPaymentCompleted =
    useCallback(
      (
        completedTransactionId: string,
      ) => {
        try {
          const chromeApi = (
            globalThis as typeof globalThis & {
              chrome?: {
                runtime?: {
                  sendMessage?: (
                    extensionId: string,
                    message: {
                      type: string;
                      transactionId: string;
                    },
                  ) => Promise<unknown>;
                };
              };
            }
          ).chrome;

          if (
            typeof chromeApi?.runtime
              ?.sendMessage !== "function"
          ) {
            console.info(
              "[ExtensionHub Checkout] AccessScan extension messaging is unavailable.",
            );

            return;
          }

          void chromeApi.runtime
            .sendMessage(
              "kboajclcikaacjahplodipielkpoogef",
              {
                type:
                  "PADDLE_PAYMENT_COMPLETED",
                transactionId:
                  completedTransactionId,
              },
            )
            .then(() => {
              console.info(
                "[ExtensionHub Checkout] AccessScan payment completion notification sent.",
              );
            })
            .catch((error) => {
              console.info(
                "[ExtensionHub Checkout] AccessScan extension notification was not delivered.",
                error,
              );
            });
        } catch (error) {
          console.info(
            "[ExtensionHub Checkout] AccessScan extension messaging failed.",
            error,
          );
        }
      },
      [],
    );
  /* ------------------------------------------------------------------------ */
  /* CHECKOUT COMPLETION                                                      */
  /* ------------------------------------------------------------------------ */

  const handleCheckoutCompleted =
    useCallback(
      (
        completedTransactionId: string,
      ) => {
        /*
         * Ignore duplicate completion events.
         */
        if (
          completedRef.current
        ) {
          return;
        }

        completedRef.current =
          true;

        console.log(
          "[ExtensionHub Checkout] Payment completed.",
          {
            transactionId:
              completedTransactionId,
          },
        );

        setSafeStatus(
          "completed",
        );

        /*
         * Notify the installed AccessScan extension.
         *
         * This only triggers an entitlement refresh.
         * It does NOT grant Pro access.
         *
         * The AccessScan backend remains the source
         * of truth for the user's entitlement.
         */
        notifyAccessScanPaymentCompleted(
          completedTransactionId,
        );

        /*
         * IMPORTANT:
         *
         * Do not manually close or redirect the Paddle checkout here.
         * Paddle handles the post-checkout redirect through the
         * successUrl configured in Paddle.Checkout.open().
         *
         * AccessScan entitlement is still granted only by the backend
         * after the Paddle webhook has been processed.
         */
      },
      [
        notifyAccessScanPaymentCompleted,
        setSafeStatus,
      ],
    );

  /* ------------------------------------------------------------------------ */
  /* PADDLE EVENT HANDLER                                                     */
  /* ------------------------------------------------------------------------ */

  const handlePaddleEvent =
    useCallback(
      (
        event: PaddleEventData,
      ) => {
        console.log(
          "[ExtensionHub Paddle Event]",
          event.name,
          event.data,
        );

        switch (
          event.name
        ) {
          /* -------------------------------------------------------------- */
          /* CHECKOUT COMPLETED                                             */
          /* -------------------------------------------------------------- */

          case "checkout.completed": {
            const eventData =
              event.data as {
                transaction_id?: unknown;
              };

            const completedTransactionId =
              typeof eventData.transaction_id ===
              "string"
                ? eventData.transaction_id
                : transactionId;

            handleCheckoutCompleted(
              completedTransactionId,
            );

            break;
          }

          /* -------------------------------------------------------------- */
          /* CHECKOUT CLOSED                                                */
          /* -------------------------------------------------------------- */

          case "checkout.closed": {
            if (
              completedRef.current
            ) {
              return;
            }

            console.log(
              "[ExtensionHub Checkout] Checkout closed by user.",
            );

            setSafeStatus(
              "cancelled",
            );

            break;
          }

          /* -------------------------------------------------------------- */
          /* CHECKOUT ERROR                                                  */
          /* -------------------------------------------------------------- */

          case "checkout.error": {
            if (
              completedRef.current
            ) {
              return;
            }

            console.error(
              "[ExtensionHub Checkout] Checkout error:",
              event.data,
            );

            setSafeError(
              "Paddle was unable to open the checkout. Please try again.",
            );

            setSafeStatus(
              "error",
            );

            break;
          }

          /* -------------------------------------------------------------- */
          /* PAYMENT FAILED                                                  */
          /* -------------------------------------------------------------- */

          case "checkout.payment.failed": {
            if (
              completedRef.current
            ) {
              return;
            }

            console.warn(
              "[ExtensionHub Checkout] Payment failed:",
              event.data,
            );

            break;
          }

          /* -------------------------------------------------------------- */
          /* PAYMENT ERROR                                                   */
          /* -------------------------------------------------------------- */

          case "checkout.payment.error": {
            console.warn(
              "[ExtensionHub Checkout] Payment error:",
              event.data,
            );

            break;
          }

          default: {
            break;
          }
        }
      },
      [
        handleCheckoutCompleted,
        setSafeError,
        setSafeStatus,
        transactionId,
      ],
    );
  /* ------------------------------------------------------------------------ */
  /* OPEN CHECKOUT                                                            */
  /* ------------------------------------------------------------------------ */

  const openCheckout =
    useCallback(
      async () => {
        /*
         * Prevent duplicate Paddle initialization.
         */
        if (
          initializedRef.current
        ) {
          return;
        }

        initializedRef.current =
          true;

        setSafeStatus(
          "loading",
        );

        setSafeError(
          null,
        );

        try {
          /* -------------------------------------------------------------- */
          /* ENVIRONMENT                                                    */
          /* -------------------------------------------------------------- */

          const clientToken =
            process.env
              .NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;

          const environment =
            process.env
              .NEXT_PUBLIC_PADDLE_ENVIRONMENT ===
            "sandbox"
              ? "sandbox"
              : "production";

          /* -------------------------------------------------------------- */
          /* VALIDATE                                                       */
          /* -------------------------------------------------------------- */

          if (
            !transactionId ||
            !transactionId.startsWith(
              "txn_",
            )
          ) {
            throw new Error(
              "Invalid Paddle transaction ID.",
            );
          }

          if (
            !clientToken
          ) {
            throw new Error(
              "Paddle client token is not configured.",
            );
          }

          console.log(
            "[ExtensionHub Checkout] Initializing Paddle.",
            {
              transactionId,
              environment,
            },
          );

          /* -------------------------------------------------------------- */
          /* INITIALIZE PADDLE                                              */
          /* -------------------------------------------------------------- */

          const paddle =
            await initializePaddle(
              {
                token:
                  clientToken,

                environment,

                eventCallback:
                  handlePaddleEvent,
              },
            );

          if (
            !paddle
          ) {
            throw new Error(
              "Paddle initialization failed.",
            );
          }

          /*
           * Stop if component was removed while
           * Paddle was loading.
           */
          if (
            !mountedRef.current
          ) {
            return;
          }

          paddleRef.current =
            paddle;

          console.log(
            "[ExtensionHub Checkout] Opening Paddle checkout.",
            {
              transactionId,
            },
          );

          /* -------------------------------------------------------------- */
          /* OPEN EXISTING TRANSACTION                                      */
          /* -------------------------------------------------------------- */

          paddle.Checkout.open({
            transactionId,
            settings: {
              /*
               * Paddle performs the browser redirect after a successful
               * checkout. Using an absolute URL is required by Paddle.
               *
               * Keep the transaction ID on the success URL so the
               * confirmation page can identify the completed transaction.
               */
              successUrl: `${window.location.origin}/checkout/success?transaction=${encodeURIComponent(
                transactionId,
              )}`,
            },
          });

        } catch (
          err: unknown
        ) {
          console.error(
            "[ExtensionHub Checkout] Failed to initialize checkout.",
            err,
          );

          /*
           * Allow retry after initialization failure.
           */
          initializedRef.current =
            false;

          if (
            err instanceof Error
          ) {
            setSafeError(
              err.message,
            );
          } else {
            setSafeError(
              "Unable to start secure checkout.",
            );
          }

          setSafeStatus(
            "error",
          );
        }
      },
      [
        handlePaddleEvent,
        setSafeError,
        setSafeStatus,
        transactionId,
      ],
    );

  /* ------------------------------------------------------------------------ */
  /* INITIALIZE ONCE                                                         */
  /* ------------------------------------------------------------------------ */

  useEffect(
    () => {
      mountedRef.current =
        true;

      void openCheckout();

      return () => {
        mountedRef.current =
          false;

        /*
         * Do not automatically call Checkout.close()
         * here.
         *
         * During React development / route changes,
         * forced close calls can create unwanted
         * checkout.closed events.
         */
      };
    },
    [
      openCheckout,
    ],
  );

  /* ------------------------------------------------------------------------ */
  /* RETRY                                                                    */
  /* ------------------------------------------------------------------------ */

  const retryCheckout =
    useCallback(
      () => {
        if (
          completedRef.current
        ) {
          return;
        }

        /*
         * Reset initialization guard so the checkout
         * can be opened again.
         */
        initializedRef.current =
          false;

        setSafeError(
          null,
        );

        setSafeStatus(
          "loading",
        );

        /*
         * Close any existing checkout safely before
         * opening a new one.
         */
        try {
          paddleRef.current?.Checkout.close();
        } catch (
          closeError
        ) {
          console.warn(
            "[ExtensionHub Checkout] Unable to close previous checkout.",
            closeError,
          );
        }

        paddleRef.current =
          null;

        void openCheckout();
      },
      [
        openCheckout,
        setSafeError,
        setSafeStatus,
      ],
    );

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

        padding:
          "24px",

        background:
          "#0f172a",

        color:
          "#ffffff",
      }}
    >
      <div
        style={{
          width:
            "100%",

          maxWidth:
            "520px",

          padding:
            "40px",

          textAlign:
            "center",

          borderRadius:
            "16px",

          background:
            "#172033",

          border:
            "1px solid #334155",
        }}
      >
        {/* -------------------------------------------------------------- */}
        {/* LOADING                                                        */}
        {/* -------------------------------------------------------------- */}

        {status ===
          "loading" && (
          <>
            <div
              style={{
                width:
                  "48px",

                height:
                  "48px",

                margin:
                  "0 auto 24px",

                borderRadius:
                  "50%",

                border:
                  "4px solid #334155",

                borderTopColor:
                  "#3b82f6",

                animation:
                  "spin 1s linear infinite",
              }}
            />

            <h1>
              Opening secure checkout...
            </h1>

            <p
              style={{
                color:
                  "#94a3b8",

                lineHeight:
                  "1.6",
              }}
            >
              Please wait while we prepare
              your AccessScan Pro checkout.
            </p>
          </>
        )}

        {/* -------------------------------------------------------------- */}
        {/* OPENED                                                         */}
        {/* -------------------------------------------------------------- */}

        {status ===
          "opened" && (
          <>
            <div
              style={{
                width:
                  "48px",

                height:
                  "48px",

                margin:
                  "0 auto 24px",

                borderRadius:
                  "50%",

                border:
                  "4px solid #334155",

                borderTopColor:
                  "#3b82f6",

                animation:
                  "spin 1s linear infinite",
              }}
            />

            <h1>
              Secure checkout is open
            </h1>

            <p
              style={{
                color:
                  "#94a3b8",

                lineHeight:
                  "1.6",
              }}
            >
              Complete your payment securely
              using Paddle.
            </p>
          </>
        )}

        {/* -------------------------------------------------------------- */}
        {/* COMPLETED                                                      */}
        {/* -------------------------------------------------------------- */}

        {status ===
          "completed" && (
          <>
            <div
              style={{
                fontSize:
                  "64px",
              }}
            >
              ✓
            </div>

            <h1>
              Payment successful!
            </h1>

            <p
              style={{
                color:
                  "#94a3b8",

                lineHeight:
                  "1.6",
              }}
            >
              Redirecting you to the
              confirmation page...
            </p>
          </>
        )}

        {/* -------------------------------------------------------------- */}
        {/* CANCELLED                                                      */}
        {/* -------------------------------------------------------------- */}

        {status ===
          "cancelled" && (
          <>
            <div
              style={{
                fontSize:
                  "48px",
              }}
            >
              ⚠️
            </div>

            <h1>
              Checkout cancelled
            </h1>

            <p
              style={{
                color:
                  "#94a3b8",

                lineHeight:
                  "1.6",
              }}
            >
              Your payment was not completed.
              You can safely try again.
            </p>

            <button
              type="button"
              onClick={
                retryCheckout
              }
              style={
                buttonStyle
              }
            >
              Try Again
            </button>
          </>
        )}

        {/* -------------------------------------------------------------- */}
        {/* ERROR                                                          */}
        {/* -------------------------------------------------------------- */}

        {status ===
          "error" && (
          <>
            <div
              style={{
                fontSize:
                  "48px",
              }}
            >
              ⚠️
            </div>

            <h1>
              Unable to open checkout
            </h1>

            <p
              style={{
                color:
                  "#fca5a5",

                lineHeight:
                  "1.6",
              }}
            >
              {error}
            </p>

            <button
              type="button"
              onClick={
                retryCheckout
              }
              style={
                buttonStyle
              }
            >
              Try Again
            </button>
          </>
        )}
      </div>

      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </main>
  );
}

/* ========================================================================== */
/* STYLES                                                                     */
/* ========================================================================== */

const buttonStyle = {
  marginTop:
    "24px",

  padding:
    "12px 24px",

  border:
    "none",

  borderRadius:
    "8px",

  background:
    "#3b82f6",

  color:
    "#ffffff",

  cursor:
    "pointer",

  fontSize:
    "16px",
}