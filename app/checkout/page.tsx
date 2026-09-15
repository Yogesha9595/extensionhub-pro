import CheckoutClient from "./CheckoutClient";

/* ========================================================================== */
/* TYPES                                                                      */
/* ========================================================================== */

interface CheckoutPageProps {
  searchParams: Promise<{
    _ptxn?: string;
  }>;
}

/* ========================================================================== */
/* PAGE                                                                       */
/* ========================================================================== */

export default async function CheckoutPage({
  searchParams,
}: CheckoutPageProps) {
  const params = await searchParams;

  const transactionId =
    params._ptxn?.trim();

  /*
   * Paddle transaction IDs normally begin with "txn_".
   *
   * We only perform basic validation here.
   * The actual transaction is handled by Paddle Checkout.
   */
  const isValidTransactionId =
    typeof transactionId === "string" &&
    transactionId.startsWith("txn_") &&
    transactionId.length > 4;

  /* ------------------------------------------------------------------------ */
  /* INVALID CHECKOUT LINK                                                    */
  /* ------------------------------------------------------------------------ */

  if (!isValidTransactionId) {
    return <InvalidCheckout />;
  }

  /* ------------------------------------------------------------------------ */
  /* CHECKOUT                                                                 */
  /* ------------------------------------------------------------------------ */

  return (
    <CheckoutClient
      transactionId={transactionId}
    />
  );
}

/* ========================================================================== */
/* INVALID CHECKOUT                                                           */
/* ========================================================================== */

function InvalidCheckout() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "#0f172a",
        color: "#ffffff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          padding: "40px",
          textAlign: "center",
          borderRadius: "16px",
          background: "#172033",
          border: "1px solid #334155",
        }}
      >
        <div
          style={{
            fontSize: "48px",
            marginBottom: "16px",
          }}
        >
          ⚠️
        </div>

        <h1
          style={{
            margin: "0 0 16px",
          }}
        >
          Invalid checkout link
        </h1>

        <p
          style={{
            margin: 0,
            color: "#94a3b8",
            lineHeight: "1.6",
          }}
        >
          The checkout transaction is missing or invalid.
          Please return to AccessScan and try upgrading again.
        </p>
      </div>
    </main>
  );
}