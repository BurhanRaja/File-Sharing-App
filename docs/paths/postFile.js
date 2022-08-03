// module.exports = {
//     // operation's method
//     post: {
//         tags: ["File Share and Download Operations"], // operation's tag
//         description: "Create Link", // short desc
//         operationId: "createLink", // unique operation id
//         consumes: "multipart/form-data",
//         parameters: {
//             name: "myfile",
//             in: "formData",
//             description: "Upload your file here",
//             require: true,
//             schema: {
//                 type: "file"
//             }
//         },
//         // requestBody: {
//         //     description: "Upload file",
//         //     content: {
//         //         "multipart/form-data": {
//         //             schema: {
//         //                 properties:{
//         //                     file: {
//         //                         type: "array",
//         //                         items: {
//         //                             type: "string",
//         //                             format:"binary"
//         //                         }
//         //                     }
//         //                 },
//         //             }
//         //         },
//         //         example: {
//         //             myfile: "*.jpg/*.pdf/*.png/*.docx etc."
//         //         }
//         //     },
//         // },
//         // expected responses
//         responses: {
//             // response code
//             201: {
//                 description: "Link Generated Successfully!!", // response desc
//                 content: {
//                     content: {
//                         "multipart/form-data": {
//                             schema: {
//                                 type: "object",
//                                 properties: {
//                                     data: {
//                                         type: "object",
//                                         properties: {
//                                             filePath: {
//                                                 type: "string",
//                                                 description: "download url.",
//                                                 example: "https://localhost:3000/files/any_key"
//                                             }
//                                         }
//                                     }
//                                 },
//                             },
//                         }
//                     }
//                 }
//             },
//         },
//     },
// };