import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './reading-page.scss'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore/lite";
import { Document, Page, pdfjs } from "react-pdf";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import firebase, { db } from "../../firebase/firebase.utils";
import { Button } from "@mui/material";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MyBook = ({ currentUser }) => {


    const location = useLocation()
    const storage = getStorage();
    const bookId = location.state.id;
    const [link, setLink] = useState('')
    const [currentUserId, setCurrentUserID] = useState("")
    const [currentReadingBook, setCurrentReadingBook] = useState([]);
    const [numPages, setNumPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const bookRef = ref(storage, `gs://biblioteca-online-licenta.appspot.com/booksContent/${bookId}.pdf`);
    const refCurrentlyReading = firebase.firestore().collection("currentlyReading");
    const { height, width } = useWindowDimensions();

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    function useWindowDimensions() {
        const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

        useEffect(() => {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        return windowDimensions;
    }



    function onDocumentLoadSuccess({ numPages }) {
        currentReadingBook[0] ?
            setPageNumber(currentReadingBook[0].currentPage) :
            setPageNumber(1)
        setNumPages(numPages);
    }

    const updatePageNumbers = async (value) => {
        const readingBookItem = doc(db, "currentlyReading", currentReadingBook[0].id);
        await updateDoc(readingBookItem, {
            currentPage: pageNumber + value,
            numberOfPages: numPages

        });
    }

    function changePage(offSet) {
        setPageNumber(prevPageNumber => prevPageNumber + offSet);
    }

    function changePageBack() {
        changePage(-1)
        if (currentReadingBook[0]) {
            updatePageNumbers(-1);
        }
    }

    function changePageNext() {
        changePage(+1)
        if (currentReadingBook[0]) {
            updatePageNumbers(+1);

        }
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
                default:
            }
        });

    const createBookInDb = async () => {
        await addDoc(collection(db, "currentlyReading"), {
            userId: currentUserId,
            bookId: location.state.id,
            currentPage: pageNumber,
            numberOfPages: numPages
        }).then(function (res) {

        }).catch(function (err) {

        })
    }


    function getCurrentBook() {

        setCurrentUserID(currentUser ? currentUser.id : null)


        if (bookId && currentUserId && !currentReadingBook[0]) {
            var querry = refCurrentlyReading.where("bookId", "==", location.state.id)
            querry = querry.where("userId", "==", currentUserId)
            querry.onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push({ id: doc.id, ...doc.data() });
                });
                if (items[0]) {
                    setCurrentReadingBook(items)
                }
                else {
                    createBookInDb()
                }
            });
        }
    }

    useEffect(() => {
        getCurrentBook();
        // eslint-disable-next-line
    }, [currentUser, currentUserId, bookId]
    )

    return (
        <div className="reading-page" >
            <h1 className="title">{location.state.title}</h1>

            <header className="App-header">

                <Document className="files" file={link} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page width={width > 800 ? 550 : 450} pageNumber={pageNumber} />
                    {width > 800 && pageNumber + 1 <= numPages ?
                        <Page width={width > 800 ? 550 : 450} pageNumber={pageNumber + 1} /> : null
                    }
                    
                </Document>


                <p className="page-numbers"> Page {pageNumber} of {numPages}</p>
                <div className="buttons">

                    {pageNumber > 1 &&

                        <Button variant="contained" onClick={changePageBack}>Previous Page</Button>
                    }

                    {
                        pageNumber < numPages &&
                        <Button variant="contained" onClick={changePageNext}>Next Page</Button>
                    }
                </div>
            </header>

        </div >
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});


export default connect(mapStateToProps)(MyBook);
