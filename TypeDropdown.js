import Type from "./modules/type.js";

export class TypeDropdown extends HTMLElement {
  selectedOptions = new Set();
  types = Type.getTypes();
  container = null;
  input = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
    this.container = this.shadowRoot.querySelector("#dropdown-container");
    this.input = this.shadowRoot.querySelector("#dropdown-input");
    this.init();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .display-block {
        display: block !important;
      }

      .display-none {
        display: none !important;
      }
      </style>
      <div class="container">
        <input id="dropdown-input" class="form-control" type="text" required="true"/>
        <div id="dropdown-container" class="container-fluid d-flex flex-column display-block" style="max-height: 100px; overflow: auto"></div>
      </div>`;
  }

  init() {
    const options = this.types.map((type) => {
      let option = document.createElement("span");
      option.classList.add("badge", "my-1");
      option.style =
        "width: fit-content; background-color: navy; color: white; cursor: pointer;";
      option.textContent = type;
      this.container.appendChild(option);
      return option;
    });

    this.input.addEventListener("input", this.filterOptions);
    this.input.addEventListener("focus", this.showDropdown);
    this.input.addEventListener("focusout", this.hideDropdown);
    this.container.addEventListener("mousedown", (event) => {
      event.preventDefault();
    });

    options.forEach((option) => {
      option.addEventListener("click", this.handleSpanClick);
    });
  }

  filterOptions() {
    const query = this.input.value.split(",").pop().trim().toLowerCase();
    options.forEach((option) => {
      if (option.textContent.toLowerCase().includes(query)) {
        option.style.display = "block";
      } else {
        option.style.display = "none";
      }
    });

    if (this.input.value.trim()) {
      this.this.input.classList.remove("is-invalid");
    } else {
      this.this.input.classList.add("is-invalid");
    }
  }

  handleSpanClick(event) {
    this.input.dispatchEvent(new InputEvent("input"));
    const spanText = event.target.textContent;
    let currentValue = this.input.value.trim();

    if (this.selectedOptions.has(spanText)) {
      this.selectedOptions.delete(spanText);
      const newValue = currentValue
        .split(",")
        .map((value) => value.trim())
        .filter((value) => value !== spanText)
        .join(", ");

        this.input.value = newValue.endsWith(",") ? newValue.slice(0, -1) : newValue;
    } else {
      this.input.value = currentValue + " " + spanText + ",";
      this.selectedOptions.add(spanText);
    }

    this.input.setSelectionRange(this.input.value.length, this.input.value.length);
    this.input.focus();

    this.filterOptions();
  }

  showDropdown() {
    this.container.classList.remove("display-none");
    this.container.classList.add("display-block");
    this.filterOptions();
  }

  hideDropdown() {
    this.container.classList.remove("display-block");
    this.container.classList.add("display-none");
  }

}

customElements.define("type-dropdown", TypeDropdown);
