import os
import json
import argparse
import shutil
from jinja2 import Environment, FileSystemLoader

def load_config(path):
    with open(path, encoding='utf-8') as f:
        return json.load(f)

def build_site(cfg):
    print(">>> Iniciando build.py")
    env = Environment(loader=FileSystemLoader('templates'), autoescape=True)
    tmpl = env.get_template('index.jinja2')
    out_dir = os.path.join('dist', cfg['slug'])
    os.makedirs(out_dir, exist_ok=True)
    print(f">>> Carreguei config com slug={cfg['slug']}")

    # Renderiza o HTML
    html = tmpl.render(**cfg)
    with open(os.path.join(out_dir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"✅ Site gerado em {out_dir}")

    # Copia a pasta static/
    src = 'static'
    dst = os.path.join(out_dir, 'static')
    if os.path.isdir(src):
        # Python >= 3.8:
        shutil.copytree(src, dst, dirs_exist_ok=True)
        print(f"📦 static/ copiada para {dst}")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Gera site estático a partir de JSON")
    parser.add_argument('-c','--config', default='configs/cliente.json',
                        help="Caminho para o JSON de configuração")
    args = parser.parse_args()
    cfg = load_config(args.config)
    build_site(cfg)