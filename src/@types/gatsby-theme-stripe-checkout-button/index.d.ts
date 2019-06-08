declare module "gatsby-theme-stripe-checkout-button" {
  interface Stripe {
    button: JSX.Element;
    sku: string;
    quantity: number;
    customerEmail?: string;
    customErrorMessage?: string;
  }

  /**
   * A Stripe checkout form. When submitted the user will be redirected to the stripe checkout.
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
  export const Checkout: (props: Stripe) => JSX.Element;
}
