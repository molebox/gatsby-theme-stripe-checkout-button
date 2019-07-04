import * as React from "react";
import { MetadataContext, MetadataProvider } from "../utils/MetadataProvider";
import Error from "pages/error";

interface Stripe {
  /**
   * A custom button which will act as the checkout button
   */
  button: JSX.Element;
  /**
   * The product SKU
   */
  sku: string;
  /**
   * The product quantity to be purchased
   */
  quantity: number;
  /**
   * The customers email. (Optional) Used to prefill the checkout form
   */
  customerEmail?: string;
  /**
   * A custom error message to show incase of bad api/secret key being provided. (Optional) Default text -
   * No metadata provided, please check your configuration.
   */
  customErrorMessage?: string;
}

const StripeButton = ({
  button,
  sku,
  quantity,
  customerEmail,
  customErrorMessage
}: Stripe) => {
  const metadata = React.useContext(MetadataContext);

  if (!metadata) {
    return (
      <Error
        error={
          customErrorMessage
            ? customErrorMessage
            : "No metadata provided, please check your configuration."
        }
      />
    );
  }

  let stripe: any;
  const { STRIPE_API_KEY, siteUrl } = metadata;

  React.useEffect(() => {
    stripe = Stripe(STRIPE_API_KEY);
  }, []);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        stripe &&
          stripe
            .redirectToCheckout({
              items: [{ sku, quantity }],

              // Note that it is not guaranteed your customers will be redirected to this
              // URL *100%* of the time, it's possible that they could e.g. close the
              // tab between form submission and the redirect.
              successUrl: `${siteUrl}/checkout/success`,
              cancelUrl: `${siteUrl}/checkout/canceled`,
              customerEmail,
              billingAddressCollection: "auto"
            })
            .then((result: any) => {
              // Log the result to the console to check that everything went as planned
              console.log({ result });
              if (result.error) {
                // Log the error to the console to check what went wrong
                console.log(result.error.message);
                return <Error error={result.error.message} />;
              }
            });
      }}
    >
      {button}
    </form>
  );
};

/**
 * A Stripe checkout form button. When submitted the user will be redirected to the stripe checkout.
 * Upon completion of purchase the user will be redirected back to your website.
 *
 * @example <StripeCheckout button={<MyCustomButton type="submit" text="Buy"/>} sku="sku_123" quantity={1}/>
 * @param button A custom button element to submit the form
 * @param sku A product stock keeping unit
 * @param quantity The quantity to be included in the checkout
 * @param customerEmail (optional) The customers email. Will prefill the checkout form if provided
 * @param customErrorMessage (optional) A custom error message to show incase of bad api/secret key being provided. Default -
 * No metadata provided, please check your configuration.
 */
export default ({
  button,
  sku,
  quantity,
  customerEmail,
  customErrorMessage
}: Stripe) => (
  <MetadataProvider>
    <StripeButton
      button={button}
      sku={sku}
      quantity={quantity}
      customerEmail={customerEmail}
      customErrorMessage={customErrorMessage}
    />
  </MetadataProvider>
);
