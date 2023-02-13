export function extractAttributes (data, name, imageSize) {
    if(!imageSize) {
        return data.data.attributes[name].content
    }
    return data.data.attributes[name].image.data.attributes.formats[imageSize].url;
};