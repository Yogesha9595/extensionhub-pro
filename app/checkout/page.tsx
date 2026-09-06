"use client";

import {
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

type CheckoutState =
  | "loading"
  | "opening"
  | "completed"
  | "cancelled"
  | "error";


type CheckoutError =
  | "missing_transaction"
  | "missing_configuration"
  | "initialization_failed"
  | "checkout_failed"
  | null;


/* ========================================================================== */
/* CONSTANTS                                                                  */
/* ========================================================================== */

const SUCCESS_REDIRECT_DELAY = 1000;


/* ========================================================================== */
/* CHECKOUT PAGE                                                              */
/* ========================================================================== */

export default function CheckoutPage() {

  /* ======================================================================== */
  /* STATE                                                                    */
  /* ======================================================================== */

  const [
    state,
    setState,
  ] =
    useState<CheckoutState>(
      "loading",
    );


  const [
    error,
    setError,
  ] =
    useState<string | null>(
      null,
    );


  const [
    errorType,
    setErrorType,
  ] =
    useState<CheckoutError>(
      null,
    );


  /* ======================================================================== */
  /* REFS                                                                     */
  /* ======================================================================== */

  /*
   * Prevent duplicate Paddle checkout initialization.
   *
   * This is especially important because
   * React Strict Mode can execute effects
   * more than once in development.
   */
  const checkoutStartedRef =
    useRef(
      false,
    );


  /*
   * Prevent duplicate payment completion handling.
   */
  const completionHandledRef =
    useRef(
      false,
    );


  /*
   * Track component lifecycle.
   */
  const isMountedRef =
    useRef(
      false,
    );


  /*
   * Store the active Paddle instance.
   */
  const paddleRef =
    useRef<
      Paddle | null
    >(
      null,
    );


  /*
   * Store the redirect timer.
   */
  const redirectTimeoutRef =
    useRef<
      ReturnType<typeof setTimeout>
      | null
    >(
      null,
    );


  /* ======================================================================== */
  /* CHECKOUT INITIALIZATION                                                  */
  /* ======================================================================== */

  useEffect(
    () => {

      isMountedRef.current =
        true;


      /*
       * Start checkout.
       */
      void startCheckout();


      /* ==================================================================== */
      /* CLEANUP                                                              */
      /* ==================================================================== */

      return () => {

        isMountedRef.current =
          false;


        /*
         * Clear success redirect timer.
         */
        if (
          redirectTimeoutRef.current
        ) {

          clearTimeout(
            redirectTimeoutRef.current,
          );


          redirectTimeoutRef.current =
            null;

        }


        /*
         * IMPORTANT:
         *
         * Do NOT automatically call:
         *
         * paddle.Checkout.close()
         *
         * React Strict Mode may execute cleanup
         * during development and accidentally
         * close the checkout overlay.
         */

      };

    },
    [],
  );


  /* ======================================================================== */
  /* START CHECKOUT                                                           */
  /* ======================================================================== */

  async function startCheckout() {

    try {

      /* ==================================================================== */
      /* PREVENT DUPLICATE EXECUTION                                         */
      /* ==================================================================== */

      if (
        checkoutStartedRef.current
      ) {

        console.log(
          "[ExtensionHub Checkout] Checkout already started.",
        );


        return;

      }


      checkoutStartedRef.current =
        true;


      /* ==================================================================== */
      /* RESET STATE                                                         */
      /* ==================================================================== */

      if (
        isMountedRef.current
      ) {

        setError(
          null,
        );


        setErrorType(
          null,
        );


        setState(
          "opening",
        );

      }


      /* ==================================================================== */
      /* READ TRANSACTION ID                                                 */
      /* ==================================================================== */

      const searchParams =
        new URLSearchParams(
          window.location.search,
        );


      const transactionId =
        searchParams
          .get(
            "_ptxn",
          )
          ?.trim();


      /* ==================================================================== */
      /* VALIDATE TRANSACTION ID                                             */
      /* ==================================================================== */

      if (
        !transactionId
      ) {

        console.error(
          "[ExtensionHub Checkout] Missing Paddle transaction ID.",
        );


        throw new CheckoutPageError(
          "missing_transaction",
          "This checkout link is missing a valid transaction ID.",
        );

      }


      console.log(
        "[ExtensionHub Checkout] Transaction detected:",
        transactionId,
      );


      /* ==================================================================== */
      /* READ PADDLE CONFIG                                                  */
      /* ==================================================================== */

      const clientToken =
        process.env
          .NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;


      const rawEnvironment =
        process.env
          .NEXT_PUBLIC_PADDLE_ENVIRONMENT;


      /*
       * Explicitly support only valid environments.
       */
      const environment =
        rawEnvironment ===
        "sandbox"
          ? "sandbox"
          : "production";


      /* ==================================================================== */
      /* VALIDATE PADDLE TOKEN                                               */
      /* ==================================================================== */

      if (
        !clientToken
      ) {

        console.error(
          "[ExtensionHub Checkout] Paddle client token is missing.",
        );


        throw new CheckoutPageError(
          "missing_configuration",
          "Secure checkout is temporarily unavailable. Please try again later.",
        );

      }


      console.log(
        "[ExtensionHub Checkout] Paddle configuration loaded:",
        {
          environment,

          hasClientToken:
            Boolean(
              clientToken,
            ),

          transactionId,
        },
      );


      /* ==================================================================== */
      /* INITIALIZE PADDLE                                                   */
      /* ==================================================================== */

      console.log(
        "[ExtensionHub Checkout] Initializing Paddle...",
      );


      const paddleInstance =
        await initializePaddle({

          token:
            clientToken,


          environment,


          /* ================================================================ */
          /* EVENT CALLBACK                                                  */
          /* ================================================================ */

          eventCallback:
            (
              event,
            ) => {

              handlePaddleEvent(
                event,
                transactionId,
              );

            },

        });


      /* ==================================================================== */
      /* CHECK COMPONENT LIFECYCLE                                           */
      /* ==================================================================== */

      if (
        !isMountedRef.current
      ) {

        console.log(
          "[ExtensionHub Checkout] Component unmounted during initialization.",
        );


        return;

      }


      /* ==================================================================== */
      /* VALIDATE PADDLE INSTANCE                                            */
      /* ==================================================================== */

      if (
        !paddleInstance
      ) {

        throw new CheckoutPageError(
          "initialization_failed",
          "Unable to initialize secure checkout.",
        );

      }


      /* ==================================================================== */
      /* STORE PADDLE INSTANCE                                               */
      /* ==================================================================== */

      paddleRef.current =
        paddleInstance;


      /* ==================================================================== */
      /* OPEN CHECKOUT                                                       */
      /* ==================================================================== */

      console.log(
        "[ExtensionHub Checkout] Opening Paddle checkout:",
        transactionId,
      );


      paddleInstance
        .Checkout
        .open({

          transactionId,

        });


      console.log(
        "[ExtensionHub Checkout] Paddle checkout opened successfully.",
      );

    } catch (
      caughtError
    ) {

      handleCheckoutError(
        caughtError,
      );

    }

  }

/* ======================================================================== */
/* HANDLE PADDLE EVENTS                                                     */
/* ======================================================================== */

function handlePaddleEvent(
  event: PaddleEventData,
  fallbackTransactionId: string,
) {

  /* ====================================================================== */
  /* VALIDATE EVENT                                                         */
  /* ====================================================================== */

  if (
    !event.name
  ) {

    console.warn(
      "[ExtensionHub Paddle] Received event without a name:",
      event,
    );

    return;

  }


  console.log(
    "[ExtensionHub Paddle] Event:",
    event.name,
    event.data,
  );


  /* ====================================================================== */
  /* CHECKOUT COMPLETED                                                     */
  /* ====================================================================== */

  if (
    event.name ===
    "checkout.completed"
  ) {

    if (
      completionHandledRef.current
    ) {

      console.log(
        "[ExtensionHub Checkout] Completion already handled.",
      );

      return;

    }


    completionHandledRef.current =
      true;


    /*
     * For Paddle's checkout.completed event,
     * safely extract the transaction ID.
     */

    const completedTransactionId =
      (
        event.data as {
          transaction_id?: string;
        }
      )?.transaction_id
      ??
      fallbackTransactionId;


    console.log(
      "[ExtensionHub Checkout] Payment completed:",
      completedTransactionId,
    );


    handleCheckoutCompleted(
      completedTransactionId,
    );


    return;

  }


  /* ====================================================================== */
  /* CHECKOUT CLOSED                                                        */
  /* ====================================================================== */

  if (
    event.name ===
    "checkout.closed"
  ) {

    /*
     * Ignore checkout.closed after
     * successful payment.
     */

    if (
      completionHandledRef.current
    ) {

      console.log(
        "[ExtensionHub Checkout] Checkout closed after successful payment.",
      );

      return;

    }


    console.log(
      "[ExtensionHub Checkout] User closed checkout without completing payment.",
    );


    if (
      isMountedRef.current
    ) {

      setState(
        "cancelled",
      );

    }


    return;

  }


  /* ====================================================================== */
  /* CHECKOUT ERROR                                                         */
  /* ====================================================================== */

  if (
    event.name ===
    "checkout.error"
  ) {

    console.error(
      "[ExtensionHub Paddle] Checkout error:",
      event.data,
    );


    if (
      completionHandledRef.current
    ) {

      return;

    }


    if (
      isMountedRef.current
    ) {

      setError(
        "Something went wrong while processing the checkout.",
      );


      setErrorType(
        "checkout_failed",
      );


      setState(
        "error",
      );

    }


    return;

  }


  /* ====================================================================== */
  /* UNHANDLED EVENT                                                        */
  /* ====================================================================== */

  console.log(
    "[ExtensionHub Paddle] Unhandled Paddle event:",
    event.name,
  );

}
  /* ======================================================================== */
  /* HANDLE PAYMENT COMPLETION                                                */
  /* ======================================================================== */

  function handleCheckoutCompleted(
    completedTransactionId: string,
  ) {

    /* ====================================================================== */
    /* PREVENT DUPLICATE COMPLETION                                          */
    /* ====================================================================== */

    if (
      completionHandledRef.current
    ) {

      console.log(
        "[ExtensionHub Checkout] Payment completion already handled.",
      );


      return;

    }


    completionHandledRef.current =
      true;


    console.log(
      "[ExtensionHub Checkout] Payment completed successfully.",
    );


    /* ====================================================================== */
    /* UPDATE UI                                                             */
    /* ====================================================================== */

    if (
      isMountedRef.current
    ) {

      setState(
        "completed",
      );

    }


    /* ====================================================================== */
    /* PREVENT MULTIPLE REDIRECTS                                            */
    /* ====================================================================== */

    if (
      redirectTimeoutRef.current
    ) {

      clearTimeout(
        redirectTimeoutRef.current,
      );

    }


    /* ====================================================================== */
    /* REDIRECT TO SUCCESS PAGE                                              */
    /* ====================================================================== */

    redirectTimeoutRef.current =
      setTimeout(
        () => {

          console.log(
            "[ExtensionHub Checkout] Redirecting to success page.",
          );


          /*
           * Close Paddle checkout overlay.
           */
          try {

            paddleRef
              .current
              ?.Checkout
              .close();

          } catch (
            closeError
          ) {

            console.warn(
              "[ExtensionHub Checkout] Unable to close Paddle checkout:",
              closeError,
            );

          }


          /*
           * Redirect to success page.
           */
          window.location.replace(
            `/checkout/success?transaction=${encodeURIComponent(
              completedTransactionId,
            )}`,
          );

        },
        SUCCESS_REDIRECT_DELAY,
      );

  }


  /* ======================================================================== */
  /* HANDLE ERRORS                                                            */
  /* ======================================================================== */

  function handleCheckoutError(
    caughtError: unknown,
  ) {

    console.error(
      "[ExtensionHub Checkout] Failed to start checkout:",
      caughtError,
    );


    let message =
      "Unable to start secure checkout.";


    let type:
      CheckoutError =
      "checkout_failed";


    if (
      caughtError instanceof
      CheckoutPageError
    ) {

      message =
        caughtError.message;


      type =
        caughtError.type;

    } else if (
      caughtError instanceof
      Error
    ) {

      message =
        caughtError.message;

    }


    if (
      !isMountedRef.current
    ) {

      return;

    }


    setError(
      message,
    );


    setErrorType(
      type,
    );


    setState(
      "error",
    );

  }


  /* ======================================================================== */
  /* RETRY CHECKOUT                                                           */
  /* ======================================================================== */

  function retryCheckout() {

    /*
     * Do not retry if payment
     * was already completed.
     */
    if (
      completionHandledRef.current
    ) {

      return;

    }


    /*
     * Reset checkout initialization.
     */
    checkoutStartedRef.current =
      false;


    paddleRef.current =
      null;


    setError(
      null,
    );


    setErrorType(
      null,
    );


    setState(
      "loading",
    );


    /*
     * Restart checkout.
     */
    void startCheckout();

  }


  /* ======================================================================== */
  /* LOADING / OPENING UI                                                     */
  /* ======================================================================== */

  if (
    state === "loading" ||
    state === "opening"
  ) {

    return (
      <CheckoutShell>

        <div
          style={{
            textAlign:
              "center",

            maxWidth:
              "600px",
          }}
        >

          <div
            style={{
              width:
                "52px",

              height:
                "52px",

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


          <h1
            style={{
              margin:
                "0 0 12px",

              fontSize:
                "28px",
            }}
          >
            Opening secure checkout...
          </h1>


          <p
            style={{
              margin:
                "0",

              color:
                "#94a3b8",

              fontSize:
                "16px",
            }}
          >
            Please wait while we prepare your
            AccessScan Pro checkout.
          </p>

        </div>

      </CheckoutShell>
    );

  }


  /* ======================================================================== */
  /* PAYMENT COMPLETED UI                                                     */
  /* ======================================================================== */

  if (
    state === "completed"
  ) {

    return (
      <CheckoutShell>

        <div
          style={{
            textAlign:
              "center",

            maxWidth:
              "600px",
            }}
        >

          <div
            style={{
              fontSize:
                "64px",

              marginBottom:
                "20px",
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
            }}
          >
            Preparing your AccessScan Pro subscription...
          </p>

        </div>

      </CheckoutShell>
    );

  }


  /* ======================================================================== */
  /* CHECKOUT CANCELLED UI                                                    */
  /* ======================================================================== */

  if (
    state === "cancelled"
  ) {

    return (
      <CheckoutShell>

        <CheckoutCard>

          <div
            style={{
              fontSize:
                "48px",

              marginBottom:
                "20px",
            }}
          >
            ⓘ
          </div>


          <h1
            style={{
              margin:
                "0 0 16px",
            }}
          >
            Checkout cancelled
          </h1>


          <p
            style={{
              margin:
                "0",

              color:
                "#cbd5e1",

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
              primaryButtonStyle
            }
          >
            Try Again
          </button>

        </CheckoutCard>

      </CheckoutShell>
    );

  }


  /* ======================================================================== */
  /* ERROR UI                                                                 */
  /* ======================================================================== */

  return (
    <CheckoutShell>

      <CheckoutCard>

        <div
          style={{
            fontSize:
              "48px",

            marginBottom:
              "20px",
          }}
        >
          ⚠
        </div>


        <h1
          style={{
            margin:
              "0 0 16px",
          }}
        >
          Unable to open checkout
        </h1>


        <p
          style={{
            margin:
              "0",

            color:
              "#fca5a5",

            lineHeight:
              "1.6",
          }}
        >
          {error}
        </p>


        {errorType ===
        "missing_transaction"
          ? (
            <p
              style={{
                marginTop:
                  "20px",

                color:
                  "#94a3b8",

                fontSize:
                  "14px",
              }}
            >
              Please return to the AccessScan extension
              and start checkout again.
            </p>
          )
          : null}


        {errorType !==
        "missing_transaction"
          ? (
            <button
              type="button"
              onClick={
                retryCheckout
              }
              style={
                primaryButtonStyle
              }
            >
              Try Again
            </button>
          )
          : null}

      </CheckoutCard>

    </CheckoutShell>
  );

}


/* ========================================================================== */
/* CUSTOM ERROR                                                               */
/* ========================================================================== */

class CheckoutPageError
  extends Error {

  public type:
    CheckoutError;


  constructor(
    type:
      CheckoutError,
    message:
      string,
  ) {

    super(
      message,
    );


    this.name =
      "CheckoutPageError";


    this.type =
      type;

  }

}


/* ========================================================================== */
/* REUSABLE PAGE SHELL                                                        */
/* ========================================================================== */

function CheckoutShell({
  children,
}: {
  children:
    React.ReactNode;
}) {

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

      {children}


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
/* REUSABLE CARD                                                              */
/* ========================================================================== */

function CheckoutCard({
  children,
}: {
  children:
    React.ReactNode;
}) {

  return (
    <div
      style={{
        maxWidth:
          "650px",

        width:
          "100%",

        padding:
          "40px",

        textAlign:
          "center",

        background:
          "#172033",

        borderRadius:
          "16px",

        border:
          "1px solid #334155",

        boxShadow:
          "0 20px 50px rgba(0, 0, 0, 0.35)",
      }}
    >

      {children}

    </div>
  );

}


/* ========================================================================== */
/* BUTTON STYLE                                                               */
/* ========================================================================== */

const primaryButtonStyle = {

  marginTop:
    "28px",

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

};