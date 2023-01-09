import React, { useEffect, useState } from "react";

import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { marked } from "marked";

import "github-markdown-css/github-markdown-light.css";
import "./GitHubReadme.scss";

const GitHubReadme = ({ repo, branch }) => {
  const readmeURL = `https://raw.githubusercontent.com/${repo}/${branch}/README.md`;

  const [readme, setReadme] = useState("");
  const [markdown, setMarkdown] = useState("");

  marked.setOptions({
    highlight: function (code, lang) {
      const hljs = require("highlight.js");
      const language = hljs.getLanguage(lang) ? lang : "plaintext";

      return hljs.highlight(code, { language }).value;
    },
    gfm: true,
    langPrefix: "hljs language-",
  });

  useEffect(() => {
    fetch(readmeURL)
      .then(res => res.text())
      .then(data => {
        setReadme(data);
      });
  }, [readmeURL]);

  useEffect(() => {
    setMarkdown(marked(readme || ""));
  }, [readme]);

  return (
    <>
      <div className="markdown-body">{parse(DOMPurify.sanitize(markdown))}</div>
    </>
  );
};

export default GitHubReadme;
