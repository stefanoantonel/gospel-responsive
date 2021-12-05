import gospel_utils


evang_value = gospel_utils.find_gospel()
gospel = gospel_utils.get_gospel(evang_value)
audio = gospel_utils.get_audio(evang_value)
copyright = gospel_utils.get_copyright()
content = gospel_utils.gospel_html(gospel + audio + copyright)

with open('./index.html', 'w') as f:
  f.writelines(content)
