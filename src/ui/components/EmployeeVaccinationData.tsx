import React, { useMemo } from 'react'
import moment from 'moment';

import { Info } from '.'
import { IVaccineStatus } from '../../interfaces';
import { EmojiEmotions, Sick, Tag, Today, Vaccines } from '@mui/icons-material';

interface Props {
  vaccineStatus?: IVaccineStatus | null;
}

export const EmployeeVaccinationData = React.memo(({ vaccineStatus }: Props) => {

  const dateFormatted = useMemo(() => {
    return vaccineStatus?.date ? moment(vaccineStatus?.date).format('DD/MM/YYYY') : '';
  }, [vaccineStatus?.date])

  const status = useMemo(() => {
    if (vaccineStatus?.isVaccinated === true) return 'SI';
    if (vaccineStatus?.isVaccinated === false) return 'NO';
  }, [vaccineStatus?.isVaccinated]);

  return (
    <div className='row overflow-hidden align-items-center' style={{ flexGrow: 1 }}>
      <div className="col-md-4 col-lg-3 py-2">
        <Info
          title='Vacunado'
          info={status}
          icon={!!vaccineStatus?.isVaccinated ? <EmojiEmotions /> : <Sick />}
        />
      </div>
      <div className="col-md-4 col-lg-3 py-2">
        <Info
          title='Tipo de vacuna'
          info={vaccineStatus?.vaccine}
          icon={<Vaccines />}
        />
      </div>
      <div className="col-md-4 col-lg-3 py-2">
        <Info
          title='Fecha'
          info={dateFormatted}
          icon={<Today />}
        />
      </div>
      <div className="col-md-4 col-lg-3 py-2">
        <Info
          title='Dósis'
          info={`${vaccineStatus?.doses === 0 ? '' : vaccineStatus?.doses}`}
          icon={<Tag />}
        />
      </div>
    </div>
  )
})
