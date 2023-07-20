import { LitElement, PropertyValueMap, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
/**
 * Star to use in the stars rating simple element.
 */
@customElement("star-element")
export class StarElement extends LitElement {
  @property({ type: Number }) fill = 0;
  @property({ type: Boolean }) selected = false;

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    // this.addEventListener("mousemove", (e) => {
    //   const { width, left } = this.getBoundingClientRect();
    //   console.log(width);
    //   const x = (e.clientX - left) / width;
    //   const percentX = (x * 100) / 50;
    //   this.fill = percentX >= 1 ? 100 : 50;
    // });
    // this.addEventListener("mouseleave", (e) => {
    //   !this.selected && (this.fill = 0);
    // });
  }

  render() {
    const classes = { selected: this.selected };

    return html`
      <div classMap class="star__container ${classMap(classes)}">
        <svg
          id="star"
          viewbox="0 0 53.867 53.867"
          xml="preserve"
          fill="#000000"
          stroke="#000000"
          stroke-width="1"
        >
          <g id="star__polygon">
            <polygon
              fill="white"
              points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182 "
            ></polygon>
          </g>
          <!-- Use the star shape as a mask on the filled rectangle -->
          <mask id="star__mask">
            <use xlink:href="#star__polygon" fill="white" />
          </mask>

          <!-- Apply the mask to the filled rectangle -->
          <rect
            x="0"
            y="0"
            width="${this.selected ? this.fill : 0}%"
            height="100%"
            fill="blue"
            mask="url(#star__mask)"
          ></rect>
        </svg>
      </div>
    `;
  }

  static styles = css`
    :host {
      padding-inline-end: 8px;
    }

    :host:last-child {
      padding-inline-end: 0;
    }

    .selected rect {
      fill: red;
    }

    .star__container {
      display: block;
      height: 48px;
      width: 48px;
      transform: translateY(0);
      transition: transform 150ms ease-in-out;
    }

    .star__container:hover {
      transform: translateY(-10%);
      cursor: pointer;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "star-element": StarElement;
  }
}
