"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  initializePaddle,
  type Paddle,
} from "@paddle/paddle-js";


/* ========================================================================== */
/* TYPES                                                                      */
/* ========================================================================== */

type CheckoutState =
  | "loading"
  | "opening"
  | "completed"
  | "error";


/* ========================================================================== */
/* CHECKOUT PAGE                                                              */
/* ========================================================================== */

export default function CheckoutPage() {

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


  /*
   * Prevent checkout.completed
   * from being processed multiple times.
   */
  const completionHandledRef =
    useRef(
      false,
    );


  /*
   * Prevent duplicate checkout opening.
   */
  const checkoutStartedRef =
    useRef(
      false,
    );


  /*
   * Track whether the component
   * is still mounted.
   */
  const isMountedRef =
    useRef(
      true,
    );


  /*
   * Store Paddle instance.
   */
  const paddleRef =
    useRef<
      Paddle | null
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


      let redirectTimeout:
        ReturnType<typeof setTimeout>
        | null =
        null;


      async function openCheckout() {

        try {

          /* ================================================================ */
          /* PREVENT DUPLICATE EXECUTION                                     */
          /* ================================================================ */

          if (
            checkoutStartedRef.current
          ) {

            return;

          }


          checkoutStartedRef.current =
            true;


          /* ================================================================ */
          /* READ TRANSACTION ID                                             */
          /* ================================================================ */

          const searchParams =
            new URLSearchParams(
              window.location.search,
            );


          const transactionId =
            searchParams.get(
              "_ptxn",
            );


          if (
            !transactionId
          ) {

            throw new Error(
              "Missing Paddle transaction ID.",
            );

          }


          console.log(
            "[ExtensionHub Checkout] Transaction ID:",
            transactionId,
          );


          /* ================================================================ */
          /* READ PADDLE CONFIG                                              */
          /* ================================================================ */

          const clientToken =
            process.env
              .NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;


          const rawEnvironment =
            process.env
              .NEXT_PUBLIC_PADDLE_ENVIRONMENT;


          const environment =
            rawEnvironment ===
            "sandbox"
              ? "sandbox"
              : "production";


          if (
            !clientToken
          ) {

            throw new Error(
              "Paddle client token is not configured.",
            );

          }


          console.log(
            "[ExtensionHub Checkout] Configuration:",
            {
              environment,

              hasClientToken:
                Boolean(
                  clientToken,
                ),

              transactionId,
            },
          );


          /* ================================================================ */
          /* UPDATE PAGE STATE                                               */
          /* ================================================================ */

          if (
            isMountedRef.current
          ) {

            setState(
              "opening",
            );

          }


          /* ================================================================ */
          /* INITIALIZE PADDLE                                               */
          /* ================================================================ */

          const paddleInstance =
            await initializePaddle({

              token:
                clientToken,


              environment,


              /* ============================================================ */
              /* EVENT CALLBACK                                              */
              /* ============================================================ */

              eventCallback:
                (
                  event,
                ) => {

                  console.log(
                    "[ExtensionHub Paddle] Event:",
                    event.name,
                    event.data,
                  );


                  /* ======================================================== */
                  /* PAYMENT COMPLETED                                       */
                  /* ======================================================== */

                  if (
                    event.name ===
                    "checkout.completed"
                  ) {

                    if (
                      completionHandledRef.current
                    ) {

                      console.log(
                        "[ExtensionHub Paddle] Completion already handled.",
                      );

                      return;

                    }


                    completionHandledRef.current =
                      true;


                    console.log(
                      "[ExtensionHub Paddle] Payment completed successfully.",
                    );


                    if (
                      isMountedRef.current
                    ) {

                      setState(
                        "completed",
                      );

                    }


                    /* ------------------------------------------------------ */
                    /* GET COMPLETED TRANSACTION ID                          */
                    /* ------------------------------------------------------ */

                    const completedTransactionId =
                      event.data
                        ?.transaction_id
                      ??
                      transactionId;


                    /* ------------------------------------------------------ */
                    /* REDIRECT TO SUCCESS PAGE                              */
                    /* ------------------------------------------------------ */

                    redirectTimeout =
                      setTimeout(
                        () => {

                          console.log(
                            "[ExtensionHub Checkout] Redirecting to success page.",
                          );


                          /*
                           * Close Paddle checkout.
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
                           * Navigate to success page.
                           */

                          window.location.replace(
                            `/checkout/success?transaction=${encodeURIComponent(
                              completedTransactionId,
                            )}`,
                          );

                        },
                        1000,
                      );


                    return;

                  }


                  /* ======================================================== */
                  /* CHECKOUT CLOSED                                         */
                  /* ======================================================== */

                  if (
                    event.name ===
                    "checkout.closed"
                  ) {

                    console.log(
                      "[ExtensionHub Paddle] Checkout closed.",
                    );


                    /*
                     * Ignore checkout.closed after
                     * successful payment.
                     */

                    if (
                      completionHandledRef.current
                    ) {

                      return;

                    }


                    /*
                     * User closed checkout without payment.
                     *
                     * We intentionally keep the page open
                     * so the user can use the browser Back
                     * button or reload.
                     */

                    console.log(
                      "[ExtensionHub Checkout] Checkout closed before payment.",
                    );


                    return;

                  }


                  /* ======================================================== */
                  /* CHECKOUT ERROR                                          */
                  /* ======================================================== */

                  if (
                    event.name ===
                    "checkout.error"
                  ) {

                    console.error(
                      "[ExtensionHub Paddle] Checkout error:",
                      event.data,
                    );

                  }

                },

            });


          /* ================================================================ */
          /* VALIDATE PADDLE INSTANCE                                        */
          /* ================================================================ */

          if (
            !paddleInstance
          ) {

            throw new Error(
              "Failed to initialize Paddle.",
            );

          }


          paddleRef.current =
            paddleInstance;


          /* ================================================================ */
          /* CHECK COMPONENT LIFECYCLE                                       */
          /* ================================================================ */

          if (
            !isMountedRef.current
          ) {

            return;

          }


          /* ================================================================ */
          /* OPEN CHECKOUT                                                   */
          /* ================================================================ */

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

          console.error(
            "[ExtensionHub Checkout] Failed to open checkout:",
            caughtError,
          );


          const message =
            caughtError instanceof Error
              ? caughtError.message
              : "Unable to start secure checkout.";


          if (
            isMountedRef.current
          ) {

            setError(
              message,
            );


            setState(
              "error",
            );

          }

        }

      }


      openCheckout();


      /* ================================================================== */
      /* CLEANUP                                                            */
      /* ================================================================== */

      return () => {

        isMountedRef.current =
          false;


        if (
          redirectTimeout
        ) {

          clearTimeout(
            redirectTimeout,
          );

        }


        /*
         * Do not automatically call
         * Paddle.Checkout.close() here.
         *
         * React Strict Mode can execute
         * effect cleanup during development.
         *
         * Automatically closing Paddle here
         * can cause checkout to disappear.
         */

      };

    },
    [],
  );


  /* ======================================================================== */
  /* LOADING / OPENING                                                        */
  /* ======================================================================== */

  if (
    state === "loading" ||
    state === "opening"
  ) {

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


  /* ======================================================================== */
  /* PAYMENT COMPLETED                                                        */
  /* ======================================================================== */

  if (
    state === "completed"
  ) {

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
            textAlign:
              "center",
            maxWidth:
              "600px",
          }}
        >

          <h1>
            Payment successful!
          </h1>


          <p
            style={{
              color:
                "#94a3b8",
            }}
          >
            Activating your AccessScan Pro subscription...
          </p>

        </div>

      </main>

    );

  }


  /* ======================================================================== */
  /* ERROR                                                                    */
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
        }}
      >

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


        <button
          type="button"
          onClick={() => {

            window.location.reload();

          }}
          style={{
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
            }}
        >
          Try Again
        </button>

      </div>

    </main>

  );

}