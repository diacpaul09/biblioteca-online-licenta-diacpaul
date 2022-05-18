import React from "react";
import HTMLFlipBook from "react-pageflip";
import { useLocation } from "react-router-dom";
import './reading-page.scss'

const Page = React.forwardRef((props, ref) => {
    return (
        <div className="page" ref={ref}>
            <div className="page-content">
                <h2 className="page-header">Page header - {props.number}</h2>
                <div className="page-image"></div>
                <div className="page-text">{props.children}</div>
                <div className="page-footer">{parseInt(props.number) + 1}</div>
            </div>
        </div>
    );
});


const PageCover = React.forwardRef((props, ref) => {
    return (
        <div className="page page-cover" ref={ref} >
            <div className="page-content">
                <h2>{props.children}</h2>
            </div>
        </div>
    );
});


const MyBook = ({title}) => {

    const location=useLocation()

    return (
        <div className="reading-page" >

            <HTMLFlipBook
                className="book-pages"
                width={600}
                height={700}
                showCover={true}
                maxShadowOpacity={0}
            >
                <PageCover>{location.state.title}</PageCover>
                <Page className="book-page" number="1">ma cheama </Page>
                <Page className="book-page" number="2">Page text</Page>
                <Page className="book-page" number="3">Page text</Page>
                <Page className="book-page" number="4">Page text</Page>
                <Page className="book-page" number="5">Page text</Page>
                <Page className="book-page" number="6">Page text</Page>
                <Page className="book-page" number="7">Page text</Page>
                <Page className="book-page" number="8">Page text</Page>
                <Page className="book-page" number="9">Page text</Page>
                <Page className="book-page" number="10">Page text</Page>
                <Page className="book-page" number="11">Page text</Page>
                <Page className="book-page" number="12">Page text</Page>
                <Page className="book-page" number="13">Page text</Page>
            </HTMLFlipBook>
        </div>
    );
}

export default MyBook