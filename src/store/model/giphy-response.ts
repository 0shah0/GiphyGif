import { JsonObject, JsonProperty } from "json2typescript";
import { IGif } from "../../types/interfaces";


@JsonObject("DownsizedStill")
export class DownsizedStill {
    @JsonProperty("url", String, true)
    url: string = "";
}
@JsonObject("Preview")
export class Preview {
    @JsonProperty("url", String, true)
    url: string = "";
}

@JsonObject("Images")
export class Images {
    @JsonProperty("fixed_height_still", DownsizedStill, true)
    downsizedStill: DownsizedStill = { url : ''};

    @JsonProperty("original", DownsizedStill, true)
    preview: Preview = { url : ''};
}

@JsonObject("GiphyData")
export class GiphyData implements IGif{
    @JsonProperty("id", String, true)
    id: string = "";

    @JsonProperty("title", String, true)
    title: string = "";

    @JsonProperty("username", String, true)
    username: string = "";

    @JsonProperty("source", String, true)
    source: string = "";

    @JsonProperty("images", Images, true)
    images: Images = new Images()
}

@JsonObject("GiphyResponse")
export class GiphyResponse {
    @JsonProperty("data", [GiphyData], true)
    data: GiphyData[]  = [];
}



