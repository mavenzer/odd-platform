package org.opendatadiscovery.oddplatform.mapper;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.opendatadiscovery.oddplatform.api.contract.model.MetadataFieldValue;
import org.opendatadiscovery.oddplatform.dto.MetadataDto;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MetadataFieldValueMapperImpl implements MetadataFieldValueMapper {
    private final MetadataFieldMapper mapper;

    @Override
    public MetadataFieldValue mapDto(final MetadataDto dto) {
        return new MetadataFieldValue()
            .field(mapper.mapPojo(dto.metadataField()))
            .value(dto.metadataFieldValue().getValue());
    }

    @Override
    public List<MetadataFieldValue> mapDtos(final Collection<MetadataDto> dto) {
        return dto.stream().map(this::mapDto).collect(Collectors.toList());
    }
}
