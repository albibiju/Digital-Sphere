import fire from "../../config/firebase";
import * as types from "../actionsTypes/fileFoldersActionTypes";
import { DELETE_FILE } from '../actionsTypes/fileFoldersActionTypes';


//action

const addFolder = (payload) => ({
    type: types.CREATE_FOLDER,
    payload
});

const addFolders = (payload) => ({
    type: types.ADD_FOLDERS,
    payload
});

const setLoading = (payload) => ({
    type: types.SET_LOADING,
    payload
});

const setChangeFolder = (payload) => ({
    type: types.CHANGE_FOLDER,
    payload
});

// Action Creator
// Action Creator
// export const deleteFolder = (folderId) => ({
//     type: types.DELETE_FOLDER,
//     payload: folderId,
// });


// FILES

const addFiles = (payload) => ({
    type: types.ADD_FILES,
    payload,
});

const addFile = (payload) => ({
    type: types.CREATE_FILE,
    payload,
});

const setFileData = (payload) => ({
    type: types.SET_FILE_DATA,
    payload,
});

// action creators

export const createFolder = (data) => (dispatch) => {
    fire.firestore().collection("folders").add(data).then( async(folder) =>{
        const folderData = await (await folder.get()).data();
        const folderId = folder.id;
        dispatch(addFolder({data: folderData, docId: folderId}));
        alert("Folder Created Successfully")
    })
}

export const getFolders = (userId) => (dispatch) => {
    dispatch(setLoading(true));
    fire.firestore().collection("folders").where("userId", "==", userId).get().then(async (folders) => {
        const foldersData = await folders.docs.map((folder) => ({
            data:  folder.data(),
            docId: folder.id,
        }));
        dispatch(addFolders(foldersData));
        dispatch(setLoading(false));
    })
    
}

export const changeFolder = (folderId) => (dispatch) => {
    dispatch(setChangeFolder(folderId));
}


// files

export const getFiles = (userId) => (dispatch) => {
    fire.firestore().collection("files").where("userId", "==", userId).get().then(async (files) => {
        const filesData = await files.docs.map((file) => ({
            data:  file.data(),
            docId: file.id,
        }));
        dispatch(addFiles(filesData));
    })  
}

export const createFile = (data, setSuccess) => (dispatch) => {
    fire.firestore().collection("files").add(data).then(async (file) => {
        const fileData = await (await file.get()).data();
        const fileId = file.id;
        alert("File created successfully");
        dispatch(addFile({ data: fileData, docId: fileId}))
        setSuccess(true);
    }
    ).catch(() => {
        setSuccess(false);
    });    
}

export const updateFileData = (fileId, data) => (dispatch) => {
    fire.firestore().collection("files").doc(fileId).update({data}).then(() => {
        dispatch(setFileData({ fileId, data}));
        alert("File saved successfully");
    }).catch(() => {
        alert("File saved");
    });
}

// export const uploadFile = (file, data, setSuccess) => (dispatch) => {
//     const uploadFileRef = fire.storage().ref(`files/${data.userId}/${data.name}`);

//     uploadFileRef.put(file).on("state_changed", (snapshot) =>{
//         const progress = Math.round(
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//         console.log("uploading " + progress + "%");

//     }, 
//     (error) => {
//         console.log(error);
//     },
//     async () => {
//         const fileUrl = await uploadFileRef.getDownloadURL();
//         const fullData = {...data, url: fileUrl}

//         fire.firestore().collection("files").add(fullData).then(async (file) => {
//             const fileData = await (await file.get()).data();
//             const fileId = file.id;
//             alert("File uploaded successfully");
//             dispatch(addFile({ data: fileData, docId: fileId}))
//             setSuccess(true);
//         }
        
//         ).catch(() => {
//             setSuccess(false);
//         });
//     }
//     );
// }

export const uploadFile = (file, data, setSuccess) => (dispatch) => {
    const uploadFileRef = fire.storage().ref(`files/${data.userId}/${data.name}`);

    uploadFileRef.put(file).on(
        "state_changed",
        (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log("Uploading " + progress + "%");
        },
        (error) => {
            console.log(error);
            // If an error occurs during upload, delete the file from storage
            uploadFileRef.delete().then(() => {
                console.log("File deleted from storage due to upload error");
            }).catch((deleteError) => {
                console.log("Error deleting file from storage:", deleteError);
            });
            setSuccess(false);
        },
        async () => {
            try {
                const fileUrl = await uploadFileRef.getDownloadURL();
                const fullData = { ...data, url: fileUrl };

                fire.firestore().collection("files").add(fullData).then(async (file) => {
                    const fileData = await (await file.get()).data();
                    const fileId = file.id;
                    alert("File uploaded successfully");
                    dispatch(addFile({ data: fileData, docId: fileId }));
                    setSuccess(true);
                }).catch(() => {
                    setSuccess(false);
                });
            } catch (urlError) {
                console.log("Error getting file URL:", urlError);
                // If an error occurs while retrieving file URL, delete the file from storage
                uploadFileRef.delete().then(() => {
                    console.log("File deleted from storage due to URL retrieval error");
                }).catch((deleteError) => {
                    console.log("Error deleting file from storage:", deleteError);
                });
                setSuccess(false);
            }
        }
    );
};

export const deleteFile = (fileId) => async (dispatch) => {
    try {
        await fire.firestore().collection("files").doc(fileId).delete();
        dispatch({ type: DELETE_FILE, payload: fileId });
    } catch (error) {
        console.error("Error deleting file:", error);
        alert("An error occurred while deleting the file.");
    }
};
  

// export const deleteFolderFromDatabase = (folderId) => (dispatch) => {
//     // Delete the folder from the database
//     fire.firestore().collection("folders").doc(folderId).delete()
//         .then(() => {
//             // Dispatch the success action to delete the folder from the Redux store
//             dispatch(deleteFolderSuccess(folderId));
//             alert("Folder deleted successfully");
//         })
//         .catch((error) => {
            
//             console.error("Error deleting folder: ", error);
//             alert("An error occurred while deleting the folder");
//         });
// };















// import fire from "../../config/firebase";
// import * as types from "../actionsTypes/fileFoldersActionTypes";

// // Action creators for folders
// const addFolder = (payload) => ({
//     type: types.CREATE_FOLDER,
//     payload
// });

// const addFolders = (payload) => ({
//     type: types.ADD_FOLDERS,
//     payload
// });

// const setLoading = (payload) => ({
//     type: types.SET_LOADING,
//     payload
// });

// const setChangeFolder = (payload) => ({
//     type: types.CHANGE_FOLDER,
//     payload
// });

// // Action creators for files
// const addFiles = (payload) => ({
//     type: types.ADD_FILES,
//     payload,
// });

// const addFile = (payload) => ({
//     type: types.CREATE_FILE,
//     payload,
// });

// const setFileData = (payload) => ({
//     type: types.SET_FILE_DATA,
//     payload,
// });

// // Action creators
// export const createFolder = (data) => (dispatch) => {
//     fire.firestore().collection("folders").add(data).then(async(folder) => {
//         const folderData = await (await folder.get()).data();
//         const folderId = folder.id;
//         dispatch(addFolder({ data: folderData, docId: folderId }));
//         alert("Folder Created Successfully");
//     }).catch((error) => {
//         console.error("Error creating folder:", error);
//         alert("An error occurred while creating the folder.");
//     });
// };

// export const getFolders = (userId) => (dispatch) => {
//     dispatch(setLoading(true));
//     fire.firestore().collection("folders").where("userId", "==", userId).get().then(async (folders) => {
//         const foldersData = await folders.docs.map((folder) => ({
//             data: folder.data(),
//             docId: folder.id,
//         }));
//         dispatch(addFolders(foldersData));
//         dispatch(setLoading(false));
//     }).catch((error) => {
//         console.error("Error getting folders:", error);
//         alert("An error occurred while fetching folders.");
//     });
// };

// export const changeFolder = (folderId) => (dispatch) => {
//     dispatch(setChangeFolder(folderId));
// };

// export const getFiles = (userId) => (dispatch) => {
//     fire.firestore().collection("files").where("userId", "==", userId).get().then(async (files) => {
//         const filesData = await files.docs.map((file) => ({
//             data: file.data(),
//             docId: file.id,
//         }));
//         dispatch(addFiles(filesData));
//     }).catch((error) => {
//         console.error("Error getting files:", error);
//         alert("An error occurred while fetching files.");
//     });
// };

// export const createFile = (data, setSuccess) => (dispatch) => {
//     fire.firestore().collection("files").add(data).then(async (file) => {
//         const fileData = await (await file.get()).data();
//         const fileId = file.id;
//         alert("File created successfully");
//         dispatch(addFile({ data: fileData, docId: fileId }));
//         setSuccess(true);
//     }).catch((error) => {
//         console.error("Error creating file:", error);
//         alert("An error occurred while creating the file.");
//         setSuccess(false);
//     });
// };

// export const updateFileData = (fileId, data) => (dispatch) => {
//     fire.firestore().collection("files").doc(fileId).update({ data }).then(() => {
//         dispatch(setFileData({ fileId, data }));
//         alert("File saved successfully");
//     }).catch((error) => {
//         console.error("Error updating file data:", error);
//         alert("An error occurred while saving the file.");
//     });
// };

// export const uploadFile = (file, data, setSuccess) => (dispatch) => {
//     const uploadFileRef = fire.storage().ref(`files/${data.userId}/${data.name}`);

//     uploadFileRef.put(file).on(
//         "state_changed",
//         (snapshot) => {
//             const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//             console.log("Uploading " + progress + "%");
//         },
//         (error) => {
//             console.error("Upload error:", error);
//             uploadFileRef.delete().then(() => {
//                 console.log("File deleted from storage due to upload error");
//             }).catch((deleteError) => {
//                 console.error("Error deleting file from storage:", deleteError);
//             });
//             setSuccess(false);
//         },
//         async () => {
//             try {
//                 const fileUrl = await uploadFileRef.getDownloadURL();
//                 const fullData = { ...data, url: fileUrl };

//                 fire.firestore().collection("files").add(fullData).then(async (file) => {
//                     const fileData = await (await file.get()).data();
//                     const fileId = file.id;
//                     alert("File uploaded successfully");
//                     dispatch(addFile({ data: fileData, docId: fileId }));
//                     setSuccess(true);
//                 }).catch((uploadError) => {
//                     console.error("Error uploading file:", uploadError);
//                     setSuccess(false);
//                 });
//             } catch (urlError) {
//                 console.error("Error getting file URL:", urlError);
//                 uploadFileRef.delete().then(() => {
//                     console.log("File deleted from storage due to URL retrieval error");
//                 }).catch((deleteError) => {
//                     console.error("Error deleting file from storage:", deleteError);
//                 });
//                 setSuccess(false);
//             }
//         }
//     );
// };

// export const deleteFile = (fileId) => async (dispatch) => {
//     try {
//         await fire.firestore().collection("files").doc(fileId).delete();
//         dispatch({ type: types.DELETE_FILE, payload: fileId });
//     } catch (error) {
//         console.error("Error deleting file:", error);
//         alert("An error occurred while deleting the file.");
//     }
// };

export const deleteUploadedFile = (fileId) => async (dispatch) => {
    try {
        // Deleting from Storage
        await fire.storage().ref(`files/${fileId}`).delete();

        // Deleting from Redux Store
        dispatch({
            type: types.DELETE_UPLOADED_FILE,
            payload: fileId,
        });

        // Optionally, you can also delete the file data from Firestore if it's stored there
        // await fire.firestore().collection("files").doc(fileId).delete();
        
        // Optionally, dispatch any additional actions or perform other operations after deletion
    } catch (error) {
        console.error("Error deleting uploaded file:", error);
        // Handle any errors that occur during deletion
    }
};

