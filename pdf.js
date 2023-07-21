$("#exportPdf").click(function () {
  var pdf = new jsPDF("a", "mm", "a4");
  const content = document.getElementById("result");

  pdf.fromHTML(content, 15, 15, {
    width: 170,
  });

  pdf.save("dynamic-content.pdf");
});
