import gospel_utils
from pathlib import Path

evang_value = gospel_utils.find_gospel()
gospel = gospel_utils.get_gospel(evang_value)
audio = gospel_utils.get_audio(evang_value)
copyright = gospel_utils.get_copyright()
content = gospel_utils.gospel_html(gospel + audio + copyright)

output_path = Path('./dist')
output_path.mkdir(parents=True, exist_ok=True)
with open(output_path / 'index.html', 'w') as f:
    f.writelines(content)
