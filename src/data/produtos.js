// Dados da loja. Em um projeto real isso viria de uma API.
// Cada produto tem um `id` único, que usamos como `key` nas listas.

// Monta a URL da foto no tamanho pedido (quadrada, recortada pelo próprio Unsplash).
export function urlFoto(foto, largura, altura = largura) {
  return `https://images.unsplash.com/${foto}?auto=format&fit=crop&w=${largura}&h=${altura}&q=75`
}

export const categorias = ['Todas', 'Anéis', 'Colares', 'Brincos', 'Pulseiras']

export const FRETE_GRATIS_A_PARTIR_DE = 199

// Fotos do topo da página (ids de produtos da lista abaixo).
export const IDS_HERO = { principal: 2, apoio: 7 }

// Metais disponíveis. `cores` = [brilho, tom médio, sombra] usados no gradiente do SVG.
export const metais = [
  { id: 'ouro', nome: 'Ouro 18k', banho: 'Banho de ouro 18k', cores: ['#F8E7A8', '#CDA34A', '#8A6420'] },
  { id: 'rodio', nome: 'Ródio', banho: 'Banho de ródio', cores: ['#F7F9FC', '#B7BECE', '#6D7690'] },
  { id: 'rose', nome: 'Ouro rosé', banho: 'Banho de ouro rosé', cores: ['#FBE0D2', '#DB9A83', '#98543F'] },
]

// Fotos do Unsplash (https://unsplash.com). `foto` é o código da imagem em images.unsplash.com
// e `fotoPagina` é a página original, usada nos créditos do rodapé.
export const produtos = [
  { id: 1, nome: 'Anel Solitário Cristal', categoria: 'Anéis', tipo: 'anel', preco: 89.9, precoAntigo: 119.9, estoque: 8, novo: false,
    detalhe: 'Dourado com pedra retangular', foto: 'photo-1786228578869-71ecde3dc43e', fotoAlt: 'Anel dourado com pedra retangular sob a luz do sol', fotoPagina: 'https://unsplash.com/photos/gold-ring-with-rectangular-diamond-JsOJdjUH_H8' },
  { id: 2, nome: 'Anel Trançado', categoria: 'Anéis', tipo: 'anel', preco: 74.9, precoAntigo: null, estoque: 12, novo: true,
    detalhe: 'Dourado, acabamento liso', foto: 'photo-1598560917807-1bae44bd2be8', fotoAlt: 'Anel dourado sobre fundo branco', fotoPagina: 'https://unsplash.com/photos/gold-ring-on-white-surface-NhrcL_C0sFA' },
  { id: 3, nome: 'Anel Trio', categoria: 'Anéis', tipo: 'anel', preco: 99.9, precoAntigo: null, estoque: 0, novo: false,
    detalhe: 'Três anéis dourados', foto: 'photo-1631982690223-8aa4be0a2497', fotoAlt: 'Três anéis dourados em uma caixa branca', fotoPagina: 'https://unsplash.com/photos/three-gold-rings-in-a-white-box-wewzzx11ShI' },
  { id: 4, nome: 'Colar Pingente Oval', categoria: 'Colares', tipo: 'colar', preco: 119.9, precoAntigo: 149.9, estoque: 6, novo: false,
    detalhe: 'Dourado com pingente oval', foto: 'photo-1783541507490-edb026e2a961', fotoAlt: 'Colar dourado com pingente oval sobre superfície texturizada', fotoPagina: 'https://unsplash.com/photos/gold-necklace-with-an-oval-pendant-on-a-textured-surface-HiGJ04wtX4w' },
  { id: 5, nome: 'Colar Corrente', categoria: 'Colares', tipo: 'colar', preco: 139.9, precoAntigo: null, estoque: 4, novo: true,
    detalhe: 'Corrente dourada', foto: 'photo-1611107683227-e9060eccd846', fotoAlt: 'Colar de corrente dourada sobre superfície branca', fotoPagina: 'https://unsplash.com/photos/gold-chain-necklace-on-white-surface-aldDZePniqg' },
  { id: 6, nome: 'Colar de Contas', categoria: 'Colares', tipo: 'colar', preco: 109.9, precoAntigo: null, estoque: 9, novo: false,
    detalhe: 'Contas douradas e prateadas', foto: 'photo-1611591437281-460bfbe1220a', fotoAlt: 'Colar de contas douradas e prateadas', fotoPagina: 'https://unsplash.com/photos/gold-and-silver-beaded-necklace--nKCbZlOHek' },
  { id: 7, nome: 'Brinco Argola Torcida', categoria: 'Brincos', tipo: 'brinco', preco: 59.9, precoAntigo: 79.9, estoque: 20, novo: false,
    detalhe: 'Dourado, formato torcido', foto: 'photo-1617038220319-276d3cfab638', fotoAlt: 'Duas argolas douradas torcidas sobre pedras brancas', fotoPagina: 'https://unsplash.com/photos/gold-twisted-hoop-earrings-on-stones-5ngCICAXiH0' },
  { id: 8, nome: 'Brinco Pedra Azul', categoria: 'Brincos', tipo: 'brinco', preco: 84.9, precoAntigo: null, estoque: 5, novo: true,
    detalhe: 'Prateado com pedra azul', foto: 'photo-1535632066927-ab7c9ab60908', fotoAlt: 'Par de brincos prateados com pedra azul', fotoPagina: 'https://unsplash.com/photos/pair-of-silver-colored-earrings-with-blue-gemstone-VJZdxfvFGuo' },
  { id: 9, nome: 'Brinco Pérola', categoria: 'Brincos', tipo: 'brinco', preco: 69.9, precoAntigo: null, estoque: 0, novo: false,
    detalhe: 'Prateado com pérola', foto: 'photo-1590166223826-12dee1677420', fotoAlt: 'Mulher usando brinco prateado com pérola branca', fotoPagina: 'https://unsplash.com/photos/woman-wearing-silver-and-white-pearl-earring-P6NiFTyI294' },
  { id: 10, nome: 'Pulseira Elos', categoria: 'Pulseiras', tipo: 'pulseira', preco: 129.9, precoAntigo: 159.9, estoque: 7, novo: false,
    detalhe: 'Corrente dourada', foto: 'photo-1602173574767-37ac01994b2a', fotoAlt: 'Pulseira de corrente dourada sobre uma revista', fotoPagina: 'https://unsplash.com/photos/a-gold-chain-bracelet-sitting-on-top-of-a-magazine-oO0JAOJhquk' },
  { id: 11, nome: 'Pulseira Contas', categoria: 'Pulseiras', tipo: 'pulseira', preco: 149.9, precoAntigo: null, estoque: 3, novo: true,
    detalhe: 'Contas prateadas e marrons', foto: 'photo-1629224316810-9d8805b95e76', fotoAlt: 'Pulseira de contas prateadas e marrons', fotoPagina: 'https://unsplash.com/photos/silver-and-brown-beaded-bracelet-Asngw4A5_tM' },
  { id: 12, nome: 'Pulseira Olho Grego', categoria: 'Pulseiras', tipo: 'pulseira', preco: 79.9, precoAntigo: null, estoque: 15, novo: false,
    detalhe: 'Com pingente de olho grego', foto: 'photo-1721206624492-3d05631471ea', fotoAlt: 'Mulher usando pulseira com pingente de olho grego', fotoPagina: 'https://unsplash.com/photos/a-woman-wearing-a-bracelet-with-a-evil-eye-on-it-W49Oxm_WnmI' },
]


