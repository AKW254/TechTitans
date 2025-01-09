import React from 'react'
import Header from '../components/Header'
import Editcards from '../components/Edit_cards'
export default function Manage_Post() {
  return (
    <>
      <Header />
      <div className="main-wrapper">
        <section className="section blog-wrap bg-gray">
          <Editcards />
        </section>
      </div>
    </>
  );
}
