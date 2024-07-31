const calculateReadTime =  (content) => {
    const words = content.split(/\s+/).length; // Split content by space and count words
    const wordPerminute = 200; // average reading speed
    return Math.ceil(words / wordPerminute); // Round up to the nearest minute
};

module.exports = { calculateReadTime }