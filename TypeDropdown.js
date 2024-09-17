import ExpenseType from "./modules/expenseType.js";

export class TypeDropdown extends HTMLElement {
  selectedOptions = new Set();
  types = ExpenseType.getAllTypes();
  container = null;
  input = null;
  options = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
    this.init();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
      <link rel="stylesheet" href="styles.css">
      <style>
      .display-block {
        display: block !important;
      }

      .display-none {
        display: none !important;
      }

      .container-fluid {
        max-height: 100px; 
        overflow: auto;
      }
      </style>
      <div class="container">
        <input id="dropdown-input" class="form-control" type="text" required="true"/>
        <div id="dropdown-container" class="container-fluid d-flex flex-column display-none"></div>
      </div>`;

      
      this.container = this.shadowRoot.querySelector("#dropdown-container");
      this.input = this.shadowRoot.querySelector("#dropdown-input");
  }

  init() {
    this.options = this.types.map((type) => {
      let option = document.createElement("span");
      option.classList.add("badge", "my-1");
      option.style =
        "width: fit-content; background-color: navy; color: white; cursor: pointer;";
      option.textContent = type;
      this.container.appendChild(option);
      return option;
    });

    this.input.addEventListener("input", () => {
      this.filterOptions();
      this.onFocusAndInput()
    });
    this.input.addEventListener("focus", () => {
      this.showDropdown();
      this.onFocusAndInput();
    });
    this.input.addEventListener("focusout", this.hideDropdown);
    this.container.addEventListener("mousedown", (event) => {
      event.preventDefault();
    });

    this.options.forEach((option) => {
      option.addEventListener("click", this.handleSpanClick);
    });

    this.filterOptions()
  }

  filterOptions = () => {
    const query = this.input.value.split(",").pop().trim().toLowerCase();
    this.options.forEach((option) => {
      if (option.textContent.toLowerCase().includes(query)) {
        option.style.display = "block";
      } else {
        option.style.display = "none";
      }
    });

    if (this.input.value.trim()) {
      this.input.classList.remove("is-invalid");
    } else {
      this.input.classList.add("is-invalid");
    }
  }

  handleSpanClick = (event) => {
    this.input.dispatchEvent(new InputEvent("input"));
    const spanText = event.target.textContent;
    let currentValue = this.input.value
    const inputs = this.input.value.split(", ");
    let lastInput = inputs[inputs.length-1]

    if (this.selectedOptions.has(spanText)) {
      this.selectedOptions.delete(spanText);
      const newValue = currentValue.split(",").map((value) => value.trim()).filter((value) => value !== spanText).join(", ");
      this.input.value = newValue;
    } else {
      if (!this.options.includes(lastInput)) {
        this.selectedOptions.add(spanText);
        this.input.value = this.input.value.replace(lastInput, spanText + ", ")
      } else {
        this.input.value = currentValue + spanText + ", ";
        this.selectedOptions.add(spanText);
      }
    }
    this.input.setSelectionRange(this.input.value.length, this.input.value.length);
    this.input.focus();
  }

  showDropdown = () => {
    this.container.classList.remove("display-none");
    this.container.classList.add("display-block");

    this.filterOptions();
  }

  hideDropdown = () => {
    this.container.classList.remove("display-block");
    this.container.classList.add("display-none");
  }

  onFocusAndInput = () => {
    const checkInputArray = this.input.value.split(",");
    checkInputArray.forEach((item) => {
      item = item.replace(" ", "");
      if (item) this.selectedOptions.add(item);
    });
  }

}

customElements.define("type-dropdown", TypeDropdown);
