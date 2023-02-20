import { ErrorBase } from "./errorBase";

type PostErrorName = "POST_ERROR";

export class PostError extends ErrorBase<PostErrorName> {}
