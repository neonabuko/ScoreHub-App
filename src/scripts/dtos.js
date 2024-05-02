export default {
    methods: {
        createChunkDto(currentChunk, fileName, chunk, totalChunks) {
            const chunkDto = new FormData()
            chunkDto.append("id", currentChunk)
            chunkDto.append("name", fileName)
            chunkDto.append("data", chunk)
            chunkDto.append("totalChunks", totalChunks)
            return chunkDto
        },

        createSongDto(songName, title, author, timeSpan) {
            const songDto = new FormData()
            songDto.append("name", songName)
            songDto.append("title", title)
            songDto.append("author", author)
            songDto.append("duration", timeSpan)
            return songDto
        },

        createScoreDto(scoreName, title, author) {
            const scoreDto = new FormData()
            scoreDto.append("name", scoreName)
            scoreDto.append("title", title)
            scoreDto.append("author", author)
            return scoreDto
        },

        createEditDto(name, title, author) {
            const songEditDto = new FormData()
            songEditDto.append("name", name)
            songEditDto.append("title", title)
            songEditDto.append("author", author)
            return songEditDto
        },
    },
}