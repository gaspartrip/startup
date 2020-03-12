const dropZone = document.getElementById("drop-zone");
const dragAndDropData = document.getElementById("drop-data");

const dropHandler = (ev) => {
  dragAndDropData.textContent = ""; //Previous data is removed
  dropZone.classList.remove("drop-zone-focus"); //Focus effect is removed
  console.log("File(s) dropped");
  let files = ev.dataTransfer.files; //Array of all files
  for (let i = 0; i < files.length; i++) {
    if (files[i].type == "text/plain") {
      let reader = new FileReader();
      reader.readAsText(files[i]);
      reader.onload = function (event) {
        dragAndDropData.textContent += " [ " + event.target.result + " ] ";
      }
    }
    else {
      alert("Only .txt files are allowed");
    }
  }
  //The event is passed to removeDragData for cleanup
  removeDragData(ev)
}

const removeDragData = (ev) => {
  if (ev.dataTransfer.items) {
    //DataTransferItemList interface to remove the drag data
    ev.dataTransfer.items.clear();
  } else {
    //DataTransfer interface to remove the drag data
    ev.dataTransfer.clearData();
  }
}

const dragOverHandler = (ev) => {
  console.log("File(s) in drop zone");
  dropZone.classList.add("drop-zone-focus");
}

const dragLeaveHandler = (ev) => {
  console.log("File(s) leaves drop zone");
  dropZone.classList.remove("drop-zone-focus");
}

//Events: https://developer.mozilla.org/en-US/docs/Web/Events

dropZone.addEventListener("drop", dropHandler);
dropZone.addEventListener("dragover", dragOverHandler);
dropZone.addEventListener("dragleave", dragLeaveHandler);

//Event listeners added in the window that calls preventDefault() on all dragover and drop events

window.addEventListener("dragover", (e) => {
  e = e || event;
  e.preventDefault();
}, false);

window.addEventListener("drop", (e) => {
  e = e || event;
  e.preventDefault();
}, false);