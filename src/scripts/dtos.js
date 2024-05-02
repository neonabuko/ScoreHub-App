export default {
    methods: {
        createChunkDto(currentChunk, fileName, chunk, totalChunks) {
            const chunkData = new FormData()
            chunkData.append("id", currentChunk)
            chunkData.append("name", fileName)
            chunkData.append("data", chunk)
            chunkData.append("totalChunks", totalChunks)
            return chunkData
        },

        createSongDto(songName, title, author, timeSpan) {
            const songData = new FormData()
            songData.append("name", songName)
            songData.append("title", title)
            songData.append("author", author)
            songData.append("duration", timeSpan)
            return songData
        },

        createScoreDto(scoreName, title, author) {
            const scoreDto = new FormData()
            scoreDto.append("name", scoreName)
            scoreDto.append("title", title)
            scoreDto.append("author", author)
            return scoreDto
        },

        createSongEditDto(name, title, author) {
            const songEditDto = new FormData()
            songEditDto.append("name", name)
            songEditDto.append("title", title)
            songEditDto.append("author", author)
            return songEditDto
        },
    },
}