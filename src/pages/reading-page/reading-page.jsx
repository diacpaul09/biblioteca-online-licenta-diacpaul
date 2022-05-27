import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './reading-page.scss'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MyBook = () => {


    const location = useLocation()
    const storage = getStorage();
    const bookRef = ref(storage, `gs://biblioteca-online-licenta.appspot.com/booksContent/${location.state.id}.pdf`);
    const [link, setLink] = useState('')

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offSet) {
        setPageNumber(prevPageNumber => prevPageNumber + offSet);
    }

    function changePageBack() {
        changePage(-1)
    }

    function changePageNext() {
        changePage(+1)
    }

    getDownloadURL(bookRef)
        .then((url) => {
            setLink(url)
        })
        .catch((error) => {
            switch (error.code) {
                case 'storage/object-not-found':
                    break;
                case 'storage/unauthorized':
                    break;
                case 'storage/canceled':
                    break;
                case 'storage/unknown':
                    break;
            }
        });



    return (
        <div className="reading-page" >


            <header className="App-header">
                <Document className="files" file={link} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page height={700} width={500} pageNumber={pageNumber} />
                    <Page height={700} width={500} pageNumber={pageNumber + 1} />
                </Document>
                <p> Page {pageNumber} of {numPages}</p>
                {pageNumber > 1 &&
                    <button onClick={changePageBack}>Previous Page</button>
                }
                {
                    pageNumber < numPages &&
                    <button onClick={changePageNext}>Next Page</button>
                }
            </header>

        </div >
    );
}

export default MyBook