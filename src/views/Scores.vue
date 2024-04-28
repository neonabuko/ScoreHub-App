<template>
    <div id="notation" class="bg-white"></div>
</template>

<script>

export default {
    mounted() {
        let tk = new verovio.toolkit();
        fetch("https://www.verovio.org/examples/downloads/Schubert_Lindenbaum.mei")
            .then((response) => response.text())
            .then((meiXML) => {
                tk.setOptions({
                    scale: 60,
                    landscape: true,
                    adjustPageWidth: true
                })
                let svg = tk.renderData(meiXML, {});
                document.getElementById("notation").innerHTML = svg;
            });
    }
}

</script>

<style></style>