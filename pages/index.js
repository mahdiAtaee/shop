/* eslint-disable react/prop-types */
import BestSellers from "@/components/home/BestSellers";
import Header from "@/components/home/Header";
import Latests from "@/components/home/Latests";
import MostViewed from "@/components/home/MostViewed";
import Popular from "@/components/home/Popular";
import ShopLayout from "@/components/layouts/Shop";
import React from "react";
import * as API from '../services/api'

export default function Home(props) {
  return (
    <div>
      <ShopLayout title="فروشگاه">
        <Header />
        <BestSellers products={props.best_sellers} />
        <MostViewed products={props.most_viewed} />
        <Latests products={props.latest} />
        <Popular products={props.popular} />
      </ShopLayout>
    </div>
  );
}

export async function getStaticProps() {
  const result = await API.get('/home')

  return {
    props: {
      best_sellers: result.data.best_sellers,
      most_viewed: result.data.most_viewed,
      popular: result.data.popular,
      latest: result.data.latest
    }
  }
}
