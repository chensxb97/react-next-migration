"use client"

import { useState, useEffect } from "react";
import { marked } from 'marked';

const Documentation = () => {
    const [content, setContent] = useState("")

    useEffect(() => {
        fetch('/api/documentation')
            .then(response => response.json())
            .then(data => {
                const { content } = data
                const htmlContent = marked(content); // Convert markdown to HTML
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