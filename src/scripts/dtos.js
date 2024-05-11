export default {
    methods: {
        createChunkDto(currentChunk, musicId, fileName, chunk, totalChunks) {
            const chunkDto = new FormData()
            chunkDto.append("id", currentChunk)
            chunkDto.append("musicId", musicId)
            chunkDto.append("name", fileName)
            chunkDto.append("data", chunk)
            chunkDto.append("totalChunks", totalChunks)
            return chunkDto
        },

        createSongDto(songName, title, author, timeSpan, publishedAt) {
            const songDto = new FormData()
            songDto.append("name", songName)
            songDto.append("title", title)
            songDto.append("author", author)
            songDto.append("duration", timeSpan)
            songDto.append("publishedAt", publishedAt)
            return songDto
        },

        createScoreDto(scoreName, title, author, publishedAt) {
            const scoreDto = new FormData()
            scoreDto.append("name", scoreName)
            scoreDto.append("title", title)
            scoreDto.append("author", author)
            scoreDto.append("publishedAt", publishedAt)
            return scoreDto
        },

        createEditDto(id, name, title, author) {
            const songEditDto = new FormData()
            songEditDto.append("id", id)
            songEditDto.append("name", name)
            songEditDto.append("title", title)
            songEditDto.append("author", author)
            return songEditDto
        },
    },
}