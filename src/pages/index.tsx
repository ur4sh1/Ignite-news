import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import styles from './home.module.scss';
// import { GetServerSideProps } from 'next'
import { GetStaticProps } from 'next'
import { stripe } from '../services/stripe';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({product}:HomeProps) {
  return (
    <>
      <Head>
        <title>ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Welcame</span>
          <h1>News about the<span>React</span>World.</h1>
          <p>
            Get acess to all the publication <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

//Recostroi a pagina a cada chamada
// export const getServerSideProps: GetServerSideProps = async () =>{
//   const price = await stripe.prices.retrieve('price_1LuGUnFhbEtAWLlwCy47lNW7', {
//     expand: ['product']
//   })

//Next gera um cache da pagina
export const getStaticProps: GetStaticProps = async () =>{
  const price = await stripe.prices.retrieve('price_1LuGUnFhbEtAWLlwCy47lNW7', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24, //24 hours
  }
}
