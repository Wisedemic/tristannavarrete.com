import Link from 'next/link';

export default () => (
    <section className="hero is-warning">
        <div className="hero-body">
            <div className="container">
                <p className="content">
                    About Page
                </p>
                <Link href="/">
                    <button className="button is-white">
                        Home Page
                    </button>
                </Link>
            </div>
        </div>
    </section>
)