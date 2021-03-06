import Types from '../../ActionsTypesConstants';
import Messages from '../../MessagesTexts';
import {confirmAlert} from 'react-confirm-alert';
import '../../../css/App.css';
import axios from "axios";

function requestDocumentsData() {

    return async (dispatch) => {
        dispatch({
            type: Types.REQUEST_DOCUMENTS
        });

        try {
            const api =  axios.create({
                baseURL: "/api/v1/documents",
                responseType: "json"
            });
            const result = await api.get('/').then(response => response.data);
            dispatch({
                type: Types.RECEIVE_DOCUMENTS,
                documents: result
            });
        } catch (err) {
            dispatch({
                type: Types.FETCH_DOCUMENTS_FAILURE,
                error: err
            });
        }
    };
}

function deleteDocument(id) {

    return async (dispatch) => {
        confirmAlert({
            title: 'Confirmation',
            message: Messages.MESSAGE_CONFIRM_DELETE,
            buttons: [
                {
                    label: 'Confirm',
                    onClick: () => {

                        fetch("/api/v1/documents/" + id,
                            {
                                method: 'DELETE',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify({id})
                            }
                        ).then(() => {
                            dispatch({type: Types.DELETE_DOCUMENT_SUCCESS, id: id});
                        }, () => {
                            dispatch({type: Types.DELETE_DOCUMENT_FAILURE})
                        });
                    }
                },
                {
                    label: 'Cancel',
                    onClick: () => {
                        console.log("Deleted cancelled")  // à voir
                    }
                }
            ]
        });

    };
}
export default {
    requestDocumentsData,
    deleteDocument
}