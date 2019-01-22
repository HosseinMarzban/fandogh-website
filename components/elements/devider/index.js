import tr from "~/assets/svg/img-wave-tr.svg";
import tl from "~/assets/svg/img-wave-tl.svg";
import br from "~/assets/svg/img-wave-br.svg";
import bl from "~/assets/svg/img-wave-bl.svg";
import fc from "~/assets/svg/img-wave-fc.svg";
import "./devider.styl";

export default {
  functional: true,
  render(h, { props }) {
    let svg = "";
    switch (props.type) {
      case "tr":
        svg = tr;
        break;
      case "fc":
        svg = fc;
        break;
      case "tl":
        svg = tl;
        break;
      case "br":
        svg = br;
        break;
      case "bl":
        svg = bl;
        break;
    }

    let styles = props.styles ? props.styles.split(" ") : [];

    return (
      <div class={["divider", ...styles]}>
        {" "}
        <img src={svg} alt="devider" />{" "}
      </div>
    );
  }
};
