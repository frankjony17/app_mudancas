from django.db import models


class Vistoria(models.Model):
    data = models.DateField(blank=True, null=True)
    hora = models.TimeField(blank=True, null=True)
    vistoriador = models.CharField(max_length=256, blank=True, null=True)
    fechada = models.BooleanField(blank=True)

    class Meta:
        default_permissions = ()


class Cliente(models.Model):
    cpf = models.CharField(unique=True, max_length=15)
    nome = models.CharField(max_length=256)
    fone = models.CharField(max_length=128, blank=True, null=True)

    class Meta:
        default_permissions = ()


class Endereco(models.Model):
    origem = models.CharField(max_length=200, blank=True, null=True)
    destino = models.CharField(max_length=200, blank=True, null=True)
    data = models.DateField()
    cliente = models.ForeignKey(Cliente, models.DO_NOTHING)

    class Meta:
        default_permissions = ()


class MaterialTipo(models.Model):
    tipo = models.CharField(unique=True, max_length=128)

    class Meta:
        db_table = 'material_tipo'
        default_permissions = ()


class Mudanca(models.Model):
    no_orden = models.IntegerField(blank=True, null=True)
    metragem = models.FloatField(blank=True, null=True)
    valor_seguro = models.FloatField(blank=True, null=True)
    valor_servicio = models.FloatField(blank=True, null=True)
    observacao = models.CharField(max_length=32, blank=True, null=True)
    vistoria = models.ForeignKey(Vistoria, models.DO_NOTHING, blank=True, null=True)
    endereco = models.ForeignKey(Endereco, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        default_permissions = ()


class Estado(models.Model):
    plaso_entrega = models.DateField(blank=True, null=True)
    apanha = models.DateField(blank=True, null=True)
    entrega = models.DateField(blank=True, null=True)
    mudanca = models.ForeignKey(Mudanca, models.DO_NOTHING)

    class Meta:
        default_permissions = ()


class MudancaMaterial(models.Model):
    mudanca = models.ForeignKey(Mudanca, on_delete=models.CASCADE)
    material_tipo = models.ForeignKey(MaterialTipo, on_delete=models.CASCADE)

    class Meta:
        db_table = 'mudanca_material'
        unique_together = (('mudanca', 'material_tipo'),)
        default_permissions = ()


class ServicioTipo(models.Model):
    tipo = models.CharField(unique=True, max_length=128)

    class Meta:
        db_table = 'servicio_tipo'
        default_permissions = ()


class MudancaServicio(models.Model):
    mudanca = models.ForeignKey(Mudanca, on_delete=models.CASCADE)
    servicio_tipo = models.ForeignKey(ServicioTipo, on_delete=models.CASCADE)

    class Meta:
        db_table = 'mudanca_servicio'
        unique_together = (('mudanca', 'servicio_tipo'),)
        default_permissions = ()


class ObservacaoMudanca(models.Model):
    descricao = models.TextField(default="")
    mudanca = models.ForeignKey(Mudanca, models.DO_NOTHING)

    class Meta:
        default_permissions = ()



