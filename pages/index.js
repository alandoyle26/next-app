import Layout from '../comps/MyLayout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Index = props => (
    <Layout>
        <h1>Batman shows</h1>
        <ul>
            {props.shows.map(show => (
                <li key={show.id}>
                    <Link href="/p/[id]" as={`/p/${show.id}`}>
                        <a>{show.name}</a>
                    </Link>
                </li>
            ))}
        </ul>
        <style jsx>
        {`
        h1, 
        a {
        font - family: "Arial";
        color: #000000;
        font-size: 22px;
        }

        ul {
        padding: 0;
        }

        li {
        list - style: none;
        margin: 5px 0;
        }

        a {
        text - decoration: none;
        color: #757575;
        }

        a:hover {
        opacity: 0.6;
        }
        `}
        </style>

    </Layout>
);

Index.getInitialProps = async function() {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
    const data = await res.json();

    console.log(`Show data fetched. Count: ${data.length}`);

    return {
        shows: data.map(entry => entry.show)
    };
};

export default Index;