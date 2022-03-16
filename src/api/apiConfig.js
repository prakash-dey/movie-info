const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: "8350b86621dffb3c66b11234ac38ffd0",
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;