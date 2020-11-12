import React from 'react';
import './styles/PageStyles.css';

function Page({ children }) {
	return <section className="Page">{children}</section>;
}

export default Page;
