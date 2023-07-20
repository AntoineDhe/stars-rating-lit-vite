import { LitElement, PropertyValueMap, css, html } from "lit";
import { customElement, queryAll, state } from "lit/decorators.js";
import "./star";
import { StarElement } from "./star";

/**
 * A stars rating simple element.
 */
@customElement("stars-rating-element")
export class StarsRatingElement extends LitElement {
  @queryAll("star-element") stars!: StarElement[];
  private starValues = new Map<StarElement, number>();
  @state() public rating = 0;

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    this.stars.forEach((star, index) => {
      this.starValues.set(star, index);
      star.addEventListener("click", this._handleStarClick);
    });
  }

  render() {
    return html`
      <div class="stars__wrapper">
        <star-element></star-element>
        <star-element></star-element>
        <star-element></star-element>
        <star-element></star-element>
        <star-element></star-element>
      </div>
    `;
  }

  private _calculatePercentFillValue(star: StarElement, clientX: number) {
    const { width, left } = star.getBoundingClientRect();
    const x = (clientX - left) / width;
    const percentX = (x * 100) / 50;
    return percentX >= 1 ? 100 : 50;
  }

  private _handleStarClick = (event: MouseEvent) => {
    const { target } = event;
    if (!(target instanceof StarElement)) return;
    const targetIndex = this.starValues.get(target) ?? 0;
    this.rating = targetIndex + target.fill / 100;
    target.selected = true;
    target.fill = this._calculatePercentFillValue(target, event.clientX);

    this.stars.forEach((star, index) => {
      if (index === targetIndex) return;
      if (index < targetIndex) {
        (star.selected = true), (star.fill = 100);
      } else {
        star.selected = false;
        star.fill = 0;
      }
    });
  };
  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    .stars__wrapper {
      display: flex;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "stars-rating-element": StarsRatingElement;
  }
}
