import { mainHtml } from './mainHtml'

const styles = `
.error {
  font-size: 40px;
  font-weight: bold;
  text-align: center;
}
`

const content = `
<div class='error'>
  an error occured<br>
  ¯\\_(ツ)_/¯
</div>
`

export const errorHtml = (): string => mainHtml(styles, content)
