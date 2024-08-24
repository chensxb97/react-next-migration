async function getDocumentation() {
    const res = await fetch('http://localhost:3001/api/documentation/get');
    const data = await res.json();
    return data?.content
}

export {
    getDocumentation
}