# Furigana Inserter for VS Code README

This extension uses [kuroshiro](https://github.com/hexenq/kuroshiro) to automatically insert furigana for Japanese kanji in various formats.

## Setting

Properties under `furigana-vscode.kuroshiro` are directly passed to kuroshiro converter. You can check its documentation [here](https://github.com/hexenq/kuroshiro?tab=readme-ov-file#api).

| Options         | Type   | Default     | Description                                                |
| --------------- | ------ | ----------- | ---------------------------------------------------------- |
| to              | String | "hiragana"  | Target syllabary [`hiragana`, `katakana`, `romaji`]        |
| mode            | String | "okurigana" | Convert mode [`normal`, `spaced`, `okurigana`, `furigana`] |
| romajiSystem\*  | String | "hepburn"   | Romanization system [`nippon`, `passport`, `hepburn`]      |
| delimiter_start | String | "{"         | Delimiter(Start)                                           |
| delimiter_end   | String | "}"         | Delimiter(End)                                             |

\*: Param romajiSystem is only applied when the value of param to is romaji. For more about it, check Romanization System

感じ取れたら手を繋ごう、重なるのは人生のライン and レミリア最高！

```
mode:"normal"
result：かんじとれたらてをつなごう、かさなるのはじんせいのライン and レミリアさいこう！
```

```
mode:"spaced"
result：かんじとれ たら て を つなご う 、 かさなる の は じんせい の ライン   and   レミ リア さいこう ！
```

```
mode:"okurigana"
result: 感{かん}じ取{と}れたら手{て}を繋{つな}ごう、重{かさ}なるのは人生{じんせい}のライン and レミリア最高{さいこう}！
```

```
mode:"furigana"
result: <ruby>感<rp>{</rp><rt>かん</rt><rp>}</rp></ruby>じ<ruby>取<rp>{</rp><rt>と</rt><rp>}</rp></ruby>れたら<ruby>手<rp>{</rp><rt>て</rt><rp>}</rp></ruby>を<ruby>繋<rp>{</rp><rt>つな</rt><rp>}</rp></ruby>ごう、<ruby>重<rp>{</rp><rt>かさ</rt><rp>}</rp></ruby>なるのは<ruby>人生<rp>{</rp><rt>じんせい</rt><rp>}</rp></ruby>のライン and レミリア<ruby>最高<rp>{</rp><rt>さいこう</rt><rp>}</rp></ruby>！
```

