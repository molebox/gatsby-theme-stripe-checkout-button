# gatsby-theme-stripe-checkout-button

A Gatsby theme that implements a stripe checkout, you bring the button, we submit it as a stripe checkout. Register an account at [Stripe](https://stripe.com/en-se) to get started.

Add to your Gatsby sites gatsby-config.js just like you would with a plugin. The `STRIPE_API_KEY`, `STRIPE_SECRET_KEY` and `siteUrl` are passed in as options from the consuming theme.

---

It is recommended that you use environment variables to store your keys. You can store them in the root of your project in env.development or env.production files.

You can access these file in your gatsby-config.js like so:

```
let activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development" || "production"

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

```

---

```
module.exports = {

    __experimentalThemes: [
      {
        resolve: 'gatsby-theme-stripe-checkout-button',
        options: {
          STRIPE_API_KEY,
          STRIPE_SECRET_KEY,
          siteUrl,
          customerEmail
        }
      }
  ],
}
```

Example usage:

```
import { Checkout } from 'gatsby-theme-stripe-checkout-button';

    <Checkout
        button={<MyCustomButton type="submit" text="Buy Now!"/>}
        sku='sku_123'
        quantity={1}
        customerEmail={customer@email.com}
    />
```

The component takes a custom button as its form submit which enables you to style it which ever way you wish, it only requires that you provide its type as 'submit'.

In addition the component requires you to provide the products sku (which can be taken from your products in your stripe dashboard) and the quantity of items to purchase. You can optionaly provide the customers email address from your form. This will enable you to prefill your customers billing information if they have already filled in the form before.

Once the user clicks the button to make a purchase they are redirected to the stripe checkout where they can fill out their card details and complete their purchase. Upon completion the user is redirected back to your gatsby site.

This theme provides three base components (success/canceled/error) which you should shadow and style yourself. These components should be placed inside your src/gatsby-theme-stripe-checkout-button/pages:

```
src/gatsby-theme-stripe-checkout-button/pages/checkout/success
src/gatsby-theme-stripe-checkout-button/pages/checkout/canceled
---
src/gatsby-theme-stripe-checkout-button/pages/error
```

## Built With

- [Gatbsy](https://www.gatsbyjs.org/)
- [Stripe](https://stripe.com/en-se)
- [TypeScript](https://www.typescriptlang.org/)

## Authors

- **Rich Haines** - _Hungry Bear Studio_

## License

This project is licensed under the MIT License
