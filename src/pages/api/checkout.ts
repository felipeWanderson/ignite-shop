import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

  const {line_items} = req.body;
  
  if (req.method !== 'POST') {
    return res.status(405).json('Method not allowed');
  }

  if (line_items?.length === 0) {
    return res.status(400).json('Price not found');
  }

  

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}` 
  const cancelUrl = `${process.env.NEXT_URL}/` 

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items,
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url
  })
}