import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

import { Database } from "@/types_db";
import { Price, Product } from "@/types";

import {stripe} from "./stripe"
import { toDateTime } from "./helpers";

export const supabaseAdmin = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

const upsertProductRecord = async (product: Stripe.Product) => {
    const productData: Product = {
        id: product.id,
        active: product.active,
        name: product.name,
        description: product.description ?? undefined,
        image: product.images?.[0] ?? null,
        metadata: product.metadata
    };

    const {error} = await supabaseAdmin
    .from('products')
    .upsert([productData])

    if(error){
        throw error;
    }

    console.log(`Product inserted/updated: ${product.id}`);
};

const upsertPriceRecord = async (price: Stripe.Price) => {
    const priceData: Price = {
        id: price.id,
        product_id: typeof price.product === 'string' ? price.product : '',
        active: price.active,
        currency: price.currency,
        description: price.nickname ?? undefined,
        type: price.type,
        unit_amount: price.unit_amount ?? undefined,
        interval: price.recurring?.interval,
        interval_count: price.recurring?.interval_count,
        trial_period_days: price.recurring?.trial_period_days,
        metadata: price.metadata
    };

    const {error} = await supabaseAdmin
        .from('prices')
        .upsert([priceData])

        if (error){
            throw error;
        }

        console.log(`Price inserted/updated: ${price.id}`);                                                                                                                 
}

const createOrRetrieveACustomer = async ({
    email,
    uiud
}: {
    email: string,
    uiud: string
}) => {
    const {data, error} = await supabaseAdmin
        .from('customers')
        .select('stripe_customer_id')
        .eq('id', uiud)
        .single()

    if (error || !data?.stripe_customer_id) {
        const customerData: {metadata: {supabaseUIUD: string}; email?: string} = {
            metadata: {
                supabaseUIUD: uiud
            }
        };

        if (email) customerData.email = email;

        const customer = await stripe.customers.create(customerData);
        const {error: supabaseError} = await supabaseAdmin
            .from('customers')
            .insert([{id: uiud, stripe_customer_id: customer.id }])

        if (supabaseError){
            throw supabaseError;
        }

        console.log(`New customer created and inserted for ${uiud}`);
        return customer.id;
    }

    return data.stripe_customer_id;
};

const copyBillingDetailsToCustomer = async (
    uiud: string,
    payment_method: Stripe.PaymentMethod 
) => {
    const customer = payment_method.customer as string;
    const {name, phone, address} = payment_method.billing_details;
    if(!name || !phone || !address) return;

    // @ts-ignore
    await stripe.customers.update(customer, {name, phone, address});
    const {error} = await supabaseAdmin
        .from('users')
        .update({
            billing_address: { ...address},
            payment_method: {...payment_method[payment_method.type] }
        })
        .eq('id', uiud);

    if (error) throw error;
};

const manageSubscriptionStatusChange = async (
    subscriptionId: string,
    custoemrId: string,
    createAction = false
) => {
    const {data: customerData, error: noCustomerError} = await supabaseAdmin
        .from('customers')
        .select('id')
        .eq('stripe_customer_id', custoemrId)
        .single();

    if (noCustomerError) throw noCustomerError

}



  