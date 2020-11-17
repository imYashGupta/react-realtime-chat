import React, { useState ,useEffect} from 'react';
import './ActionMedia.css';
const ActionMedia = (props) => {
    const [files, setFiles] = useState(Array.from(props.files))
    const [previewIndex, setPreviewIndex] = useState(0);
    const textArray = new Array(files.length);
    const [text, setText] = useState(textArray);
    const makeSrc = (fileObj) => {
        return URL.createObjectURL(fileObj);
    } 

    

    const fl = files;
    
   
    return (
        <div className="media-module">
            <div className="media-main">
            <button
                    className="btn btn-danger media-close-btn"
                >
                <i className="mdi mdi-close" aria-hidden="true"></i>
            </button>
                <div className="preview-file-bg">
                    <img alt="avatar" src={makeSrc(files[previewIndex])}/>
                    <div className="chat-footer">
                    <form>
                <div>
                    <button
                        className="btn btn-light mr-3 d-none d-sm-inline-block"
                        data-toggle="tooltip"
                        type="button"
                        data-original-title="Emoji"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-smile"
                        >
                            <circle cx={12} cy={12} r={10} />
                            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                            <line x1={9} y1={9} x2="9.01" y2={9} />
                            <line x1={15} y1={9} x2="15.01" y2={9} />
                        </svg>
                    </button>
                    <button
                        className="btn btn-danger mr-3 d-inline d-sm-none btn-close-chat "
                        data-toggle="tooltip"
                        type="button"
                        data-original-title="Emoji"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-arrow-left"
                        >
                            <line x1={19} y1={12} x2={5} y2={12} />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                    </button>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Write a message."
                    onChange={(e) => {
                        setText(ar => {
                            let f = [...ar];
                            
                            f[previewIndex] = {text:e.target.value};
                            return f;
                        })
                    }}
                    value={text[previewIndex]?.text==undefined ? '' :  text[previewIndex]?.text}
                 
                    emoji={true ? 1 : 0}
                />
                
            </form>
            </div>
                </div> 
                <div className="other-files">
                    <div className="files">
                        {
                            fl.map((file,i) => {
                                return(
                                    <div onClick={() => {
                                        setPreviewIndex(i)
                                    }} key={file.name} className="file" style={{backgroundImage:'url('+makeSrc(file)+')'}}>
                                         
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="send-btn-bg">
                        <button className="btn btn-primart send-btn"
                            onClick={() => console.log(files)}
                        >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-send"
                    >
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                        </button>
                    </div>
                </div>
            </div>    
        </div>
    );
}

export default ActionMedia;
