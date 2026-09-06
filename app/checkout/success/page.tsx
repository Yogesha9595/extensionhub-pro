"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";


/* ========================================================================== */
/* CHECKOUT SUCCESS PAGE                                                      */
/* ========================================================================== */

export default function CheckoutSuccessPage() {

  /* ======================================================================== */
  /* STATE                                                                    */
  /* ======================================================================== */

  const [
    countdown,
    setCountdown,
  ] =
    useState(
      5,
    );


  /*
   * Tracks whether the close process
   * has already started.
   */
  const closeAttemptedRef =
    useRef(
      false,
    );


  /*
   * Tracks whether the component
   * is still mounted.
   */
  const isMountedRef =
    useRef(
      true,
    );


  /* ======================================================================== */
  /* COUNTDOWN + WINDOW CLOSE                                                 */
  /* ======================================================================== */

  useEffect(
    () => {

      isMountedRef.current =
        true;


      /*
       * IMPORTANT:
       *
       * window.setInterval() returns a number
       * in the browser.
       *
       * This avoids the NodeJS.Timeout TypeScript
       * error during Next.js build.
       */
      let intervalId:
        number | null =
        null;


      /*
       * Close the checkout tab.
       */
      function closeCheckoutWindow() {

        /*
         * Prevent duplicate close attempts.
         */
        if (
          closeAttemptedRef.current
        ) {

          return;

        }


        closeAttemptedRef.current =
          true;


        console.log(
          "[ExtensionHub Checkout] Success countdown completed.",
        );


        /*
         * Clear interval before closing.
         */
        if (
          intervalId !== null
        ) {

          window.clearInterval(
            intervalId,
          );


          intervalId =
            null;

        }


        /*
         * Attempt to close the current tab.
         *
         * The tab was opened from the Chrome extension,
         * so window.close() may work depending on how
         * Chrome created the tab.
         */
        console.log(
          "[ExtensionHub Checkout] Attempting to close checkout window.",
        );


        window.close();


        /*
         * IMPORTANT:
         *
         * Browsers may block window.close()
         * if the tab was not opened directly using
         * window.open().
         *
         * In that case, the success page remains open
         * and the user can manually close it.
         *
         * We intentionally do not redirect the user
         * because AccessScan is the primary application.
         */

      }


      /*
       * Start countdown.
       */
      intervalId =
        window.setInterval(
          () => {

            setCountdown(
              (
                current,
              ) => {

                /*
                 * Stop when countdown reaches zero.
                 */
                if (
                  current <= 1
                ) {

                  /*
                   * Execute close outside
                   * React state update lifecycle.
                   */
                  window.setTimeout(
                    () => {

                      closeCheckoutWindow();

                    },
                    0,
                  );


                  return 0;

                }


                return (
                  current - 1
                );

              },
            );

          },
          1000,
        );


      /* ==================================================================== */
      /* CLEANUP                                                              */
      /* ==================================================================== */

      return () => {

        isMountedRef.current =
          false;


        if (
          intervalId !== null
        ) {

          window.clearInterval(
            intervalId,
          );


          intervalId =
            null;

        }

      };

    },
    [],
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
        {/* TITLE                                                            */}
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
        {/* DESCRIPTION                                                      */}
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
        {/* COUNTDOWN                                                        */}
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
          {countdown !== 1 ? "s" : ""}.

        </div>


        {/* ================================================================ */}
        {/* FALLBACK INFORMATION                                             */}
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
        {/* MANUAL CLOSE BUTTON                                              */}
        {/* ================================================================ */}

        <button
          type="button"
          onClick={() => {

            /*
             * Manual close attempt.
             */
            window.close();

          }}
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