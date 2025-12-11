import { type FC } from 'react'
import { cn } from '@/lib/utils'

export const TEAM_FLAGS = {
  'abc-rn': '/assets/atoms/team-flags/abc-rn.png',
  'agua_santa_sp': '/assets/atoms/team-flags/agua_santa_sp.png',
  'aguia_pa': '/assets/atoms/team-flags/aguia_pa.png',
  'aletico_del_rey_mg': '/assets/atoms/team-flags/aletico_del_rey_mg.png',
  'altos_pi': '/assets/atoms/team-flags/altos_pi.png',
  'amazonas_fc_am': '/assets/atoms/team-flags/amazonas_fc_am.png',
  'america-mineiro': '/assets/atoms/team-flags/america-mineiro.png',
  'america': '/assets/atoms/team-flags/america.png',
  'anapolis': '/assets/atoms/team-flags/anapolis.png',
  'aparecidense_go': '/assets/atoms/team-flags/aparecidense_go.png',
  'asa_al': '/assets/atoms/team-flags/asa_al.png',
  'atletico-paranaense': '/assets/atoms/team-flags/atletico-paranaense.png',
  'atletico-goianiense': '/assets/atoms/team-flags/atletico-goianiense.png',
  'atletico-mineiro': '/assets/atoms/team-flags/atletico-mineiro.png',
  'avai': '/assets/atoms/team-flags/avai.png',
  'azuriz_pr': '/assets/atoms/team-flags/azuriz_pr.png',
  'bahia': '/assets/atoms/team-flags/bahia.png',
  'barcelona_ilheus_ba': '/assets/atoms/team-flags/barcelona_ilheus_ba.png',
  'barra_sc': '/assets/atoms/team-flags/barra_sc.png',
  'boavista_rj': '/assets/atoms/team-flags/boavista_rj.png',
  'botafogo-pb': '/assets/atoms/team-flags/botafogo-pb.png',
  'botafogo-sp': '/assets/atoms/team-flags/botafogo-sp.png',
  'botafogo': '/assets/atoms/team-flags/botafogo.png',
  'brusque': '/assets/atoms/team-flags/brusque.png',
  'capital_df': '/assets/atoms/team-flags/capital_df.png',
  'ceara': '/assets/atoms/team-flags/ceara.png',
  'central_pe': '/assets/atoms/team-flags/central_pe.png',
  'chapecoense': '/assets/atoms/team-flags/chapecoense.png',
  'confianca-se': '/assets/atoms/team-flags/confianca-se.png',
  'corinthians': '/assets/atoms/team-flags/corinthians.png',
  'coritiba': '/assets/atoms/team-flags/coritiba.png',
  'crb': '/assets/atoms/team-flags/crb.png',
  'criciuma': '/assets/atoms/team-flags/criciuma.png',
  'cruzeiro': '/assets/atoms/team-flags/cruzeiro.png',
  'csa': '/assets/atoms/team-flags/csa.png',
  'cuiaba': '/assets/atoms/team-flags/cuiaba.png',
  'fc_cascavel_pr': '/assets/atoms/team-flags/fc_cascavel_pr.png',
  'ferroviaria': '/assets/atoms/team-flags/ferroviaria.png',
  'figueirense': '/assets/atoms/team-flags/figueirense.png',
  'flamengo': '/assets/atoms/team-flags/flamengo.png',
  'floresta_ce': '/assets/atoms/team-flags/floresta_ce.png',
  'fluminense': '/assets/atoms/team-flags/fluminense.png',
  'fortaleza': '/assets/atoms/team-flags/fortaleza.png',
  'gas_rr': '/assets/atoms/team-flags/gas_rr.png',
  'goianesia_nov_go': '/assets/atoms/team-flags/goianesia_nov_go.png',
  'goiania': '/assets/atoms/team-flags/goiania.png',
  'goias-esporte-clube': '/assets/atoms/team-flags/goias-esporte-clube.png',
  'goiatuba': '/assets/atoms/team-flags/goiatuba.png',
  'gremio-novorizontino': '/assets/atoms/team-flags/gremio-novorizontino.png',
  'gremio': '/assets/atoms/team-flags/gremio.png',
  'gremio_maringa': '/assets/atoms/team-flags/gremio_maringa.png',
  'guarani': '/assets/atoms/team-flags/guarani.png',
  'horizonte_ce': '/assets/atoms/team-flags/horizonte_ce.png',
  'humaita_ac': '/assets/atoms/team-flags/humaita_ac.png',
  'iguatu_ce': '/assets/atoms/team-flags/iguatu_ce.png',
  'imperatriz_ma': '/assets/atoms/team-flags/imperatriz_ma.png',
  'internacional': '/assets/atoms/team-flags/internacional.png',
  'intl': '/assets/atoms/team-flags/intl.png',
  'itabirito_mg': '/assets/atoms/team-flags/itabirito_mg.png',
  'ituano': '/assets/atoms/team-flags/ituano.png',
  'jequie_ba': '/assets/atoms/team-flags/jequie_ba.png',
  'juazeirense_ba': '/assets/atoms/team-flags/juazeirense_ba.png',
  'juventude-rs': '/assets/atoms/team-flags/juventude.png',
  'lagarto_se': '/assets/atoms/team-flags/lagarto_se.png',
  'londrina': '/assets/atoms/team-flags/londrina.png',
  'londrina_pr': '/assets/atoms/team-flags/londrina_pr.png',
  'manauara_am': '/assets/atoms/team-flags/manauara_am.png',
  'manaus_fc': '/assets/atoms/team-flags/manaus_fc.png',
  'maracanau': '/assets/atoms/team-flags/maracanau.png',
  'maranhao': '/assets/atoms/team-flags/maranhao.png',
  'marcilio_dias_sc': '/assets/atoms/team-flags/marcilio_dias_sc.png',
  'marica_rj': '/assets/atoms/team-flags/marica_rj.png',
  'mirassol': '/assets/atoms/team-flags/mirassol-atualizado.png',
  'monteazul': '/assets/atoms/team-flags/monteazul.png',
  'nautico': '/assets/atoms/team-flags/nautico.png',
  'operario-pr': '/assets/atoms/team-flags/operario-pr.png',
  'operario_ms': '/assets/atoms/team-flags/operario_ms.png',
  'palmeiras': '/assets/atoms/team-flags/palmeiras.png',
  'parnaiba_pi': '/assets/atoms/team-flags/parnaiba_pi.png',
  'paysandu': '/assets/atoms/team-flags/paysandu.png',
  'penedense_al': '/assets/atoms/team-flags/penedense_al.png',
  'ponte-preta': '/assets/atoms/team-flags/ponte-preta.png',
  'porto_velho_ro': '/assets/atoms/team-flags/porto_velho_ro.png',
  'porto_vitoria_es': '/assets/atoms/team-flags/porto_vitoria_es.png',
  'portuguesa': '/assets/atoms/team-flags/portuguesa.png',
  'pouso_alegre_mg': '/assets/atoms/team-flags/pouso_alegre_mg.png',
  'red-bull-bragantino': '/assets/atoms/team-flags/red-bull-bragantino.png',
  'remo': '/assets/atoms/team-flags/remo.png',
  'retro_pe': '/assets/atoms/team-flags/retro_pe.png',
  'riobranco': '/assets/atoms/team-flags/riobranco.png',
  'sampaio-correa': '/assets/atoms/team-flags/sampaio-correa.png',
  'santa_cruz_natal_rn': '/assets/atoms/team-flags/santa_cruz_natal_rn.png',
  'santacruz': '/assets/atoms/team-flags/santacruz.png',
  'santos': '/assets/atoms/team-flags/santos.png',
  'sao-bernardo': '/assets/atoms/team-flags/sao-bernardo.png',
  'sao-jose-rs': '/assets/atoms/team-flags/sao-jose-rs.png',
  'sao-paulo': '/assets/atoms/team-flags/sao-paulo.png',
  'saoluiz_rs': '/assets/atoms/team-flags/saoluiz_rs.png',
  'sergipe': '/assets/atoms/team-flags/sergipe.png',
  'sousa_pb3': '/assets/atoms/team-flags/sousa_pb3.png',
  'sport-recife': '/assets/atoms/team-flags/sport-recife.png',
  'tocantinopolis': '/assets/atoms/team-flags/tocantinopolis.png',
  'tombense': '/assets/atoms/team-flags/tombense.png',
  'tombense_mg': '/assets/atoms/team-flags/tombense_mg.png',
  'uniaoa_to': '/assets/atoms/team-flags/uniaoa_to.png',
  'uverdense_mt': '/assets/atoms/team-flags/uverdense_mt.png',
  'vasco-da-gama': '/assets/atoms/team-flags/vasco-da-gama.png',
  'vila-nova': '/assets/atoms/team-flags/vila-nova.png',
  'vitoria': '/assets/atoms/team-flags/vitoria.png',
  'volta-redonda': '/assets/atoms/team-flags/volta-redonda.png',
  'ypiranga-de-erechim': '/assets/atoms/team-flags/ypiranga-de-erechim.png'
} as const

export type TeamFlagVariant = keyof typeof TEAM_FLAGS

export interface TeamFlagAtomProps {
  variant: TeamFlagVariant
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeMap: Record<NonNullable<TeamFlagAtomProps['size']>, string> = {
  sm: 'w-16 h-16', // 64x64
  md: 'w-20 h-20', // 80x80
  lg: 'w-24 h-24', // 96x96
  xl: 'w-32 h-32' // 128x128
}

function humanizeVariant(variant: TeamFlagVariant): string {
  // transforma "goias-esporte-clube" em "Goias Esporte Clube"
  return variant
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export const TeamFlagAtom: FC<TeamFlagAtomProps> = ({
                                                      variant,
                                                      size = 'md',
                                                      className
                                                    }) => {
  const src = TEAM_FLAGS[variant]
  const label = `Bandeira do time: ${humanizeVariant(variant)}`

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center overflow-hidden rounded bg-background',
        sizeMap[size],
        className
      )}
      role="img"
      aria-label={label}
    >
      {src ? (
        <img
          src={src}
          alt={label}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      ) : (
        <div className="h-full w-full bg-muted" />
      )}
    </div>
  )
}
