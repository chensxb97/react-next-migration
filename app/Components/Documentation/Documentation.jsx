import { useState, useEffect } from "react";
import { marked } from 'marked';
import { getDocumentation } from "../apis/documentation"

const Documentation = () => {
    const [content, setContent] = useState("")

    useEffect(() => {
        getDocumentation()
            .then(data => {
                const htmlContent = marked(data); // Convert markdown to HTML
                setContent(htmlContent);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}

export default Documentation